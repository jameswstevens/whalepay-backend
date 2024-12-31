import express from 'express';
import cors from 'cors';
import coinbaseRoutes from './routes/coinbaseRoutes';
import { loggingMiddleware } from './middleware/logging';
import supabaseRoutes from './routes/supabaseRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.use('/api', coinbaseRoutes);
app.use('/api/supabase', supabaseRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;