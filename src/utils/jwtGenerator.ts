import { sign } from 'jsonwebtoken';
import crypto from 'crypto';
import { CoinbaseConfig, JWTPayload } from '../types/coinbase';

const algorithm = 'ES256';

export const generateJWT = (
  config: CoinbaseConfig,
  requestMethod: string,
  requestPath: string
): string => {

  console.log('config', config);
  const uri = `${requestMethod} ${config.baseUrl}${requestPath}`;
  
  const payload: JWTPayload = {
    iss: 'cdp',
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 120, // 2 minutes expiry
    sub: config.keyName,
    uri,
  };

  const header = {
    alg: algorithm,
    kid: config.keyName,
    nonce: crypto.randomBytes(16).toString('hex'),
  }

  return sign(payload, config.keySecret, {
    header,
    algorithm,
  })
};