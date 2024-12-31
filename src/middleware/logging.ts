import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log the incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log('Request Body:', req.body);
  }

  // Capture the response
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response ${res.statusCode} - ${duration}ms`);
    return originalSend.call(this, body);
  };

  next();
}; 