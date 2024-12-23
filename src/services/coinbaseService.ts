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

  async getOnrampQuote(data: any) {
    const path = '/onramp/v1/buy/quote';
    const headers = await this.getAuthHeaders('POST', path);
    
    try {
      const response = await axios.post(`https://api.developer.coinbase.com${path}`, data, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Quote Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw new Error(`Failed to fetch quote: ${error}`);
    }
  }

  async getOnrampOptions(country?: string, subdivision?: string) {
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

  async getOfframpConfig() {
    const path = '/onramp/v1/sell/config';
    const headers = await this.getAuthHeaders('GET', path);
    
    try {
      const response = await axios.get(`https://api.developer.coinbase.com${path}`, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Offramp Config Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw new Error(`Failed to fetch offramp config: ${error}`);
    }
  }

  async getOfframpOptions(country?: string, subdivision?: string) {
    if (!country) {
      throw new Error('Country is a required parameter');
    }
    
    let path = `/onramp/v1/sell/options?country=${country}`;
    if (subdivision) {
      path += `&subdivision=${subdivision}`;
    }
    
    const headers = await this.getAuthHeaders('GET', path);
    
    try {
      const response = await axios.get(`https://api.developer.coinbase.com${path}`, { headers });
      
      console.log('Offramp Options Success:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Offramp Options Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      throw new Error(`Failed to fetch offramp options: ${error}`);
    }
  }

  async getOfframpQuote(data: any) {
    const path = '/onramp/v1/sell/quote';
    const headers = await this.getAuthHeaders('POST', path);
    
    try {
      const response = await axios.post(`https://api.developer.coinbase.com${path}`, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch offramp quote: ${error}`);
    }
  }
  
}

export const coinbaseService = new CoinbaseService();