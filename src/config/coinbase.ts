import dotenv from 'dotenv';
import { CoinbaseConfig } from '../types/coinbase';

dotenv.config();

export const coinbaseConfig: CoinbaseConfig = {
  keyName: process.env.COINBASE_KEY_NAME || '',
  keySecret: process.env.COINBASE_KEY_SECRET || '',
  baseUrl: 'api.coinbase.com'
};