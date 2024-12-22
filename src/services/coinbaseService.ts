import axios from 'axios';
import { generateJWT } from '../utils/jwtGenerator';
import { coinbaseConfig } from '../config/coinbase';

export class CoinbaseService {
  private async getAuthHeaders(method: string, path: string) {
    const baseUrl = 'api.developer.coinbase.com';
    
    // For GET requests, strip query params from path for JWT signing
    const pathForJWT = method === 'GET' ? path.split('?')[0] : path;
    
    const jwt = generateJWT({
      ...coinbaseConfig,
      baseUrl
    }, method, pathForJWT);
    
    return {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    };
  }

  async getQuote(data: {
    purchase_currency: string;
    payment_amount: string;
    payment_currency: string;
    payment_method: string;
    country: string;
    subdivision: string;
  }) {
    const path = '/onramp/v1/buy/quote';
    const headers = await this.getAuthHeaders('POST', path);
    
    console.log('=== Quote Request Details ===');
    console.log('URL:', `https://api.developer.coinbase.com${path}`);
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Data:', JSON.stringify(data, null, 2));
    
    try {
      const response = await axios.post(`https://api.developer.coinbase.com${path}`, data, { headers });
      console.log('Quote Success:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Quote Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data
          }
        });
      }
      throw new Error(`Failed to fetch quote: ${error}`);
    }
  }

  async getOptions(country?: string, subdivision?: string) {
    if (!country || !subdivision) {
      throw new Error('Country and subdivision are required parameters');
    }
    
    const queryParams = `?country=${country}&subdivision=${subdivision}`;
    const path = `/onramp/v1/buy/options${queryParams}`;
    const headers = await this.getAuthHeaders('GET', path);
    
    try {
      const response = await axios.get(`https://api.developer.coinbase.com${path}`, { headers });
      
      // Filter for just USDC information
      const usdcInfo = response.data.purchase_currencies.find(
        (currency: any) => currency.symbol === 'USDC'
      );
      
      return usdcInfo || null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Options Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw new Error(`Failed to fetch options: ${error}`);
    }
  }
}

export const coinbaseService = new CoinbaseService();