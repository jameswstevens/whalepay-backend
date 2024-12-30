export interface CoinbaseConfig {
    keyName: string;
    keySecret: string;
    baseUrl: string;
  }
  
  export interface JWTPayload {
    iss: string;
    nbf: number;
    exp: number;
    sub: string;
    uri: string;
  }

export interface OfframpTransaction {
  sell_amount: {
    value: string;
    currency: string;
  };
  created_at: string;
  status: string;
  id: string;
}

export interface OfframpTransactionsResponse {
  transactions: OfframpTransaction[];
  page_key?: string;
}

export interface OfframpTransactionParams {
  partnerUserId: string;
  pageKey?: string;
  pageSize?: number;
  amount?: string;
}