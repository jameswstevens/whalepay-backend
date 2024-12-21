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