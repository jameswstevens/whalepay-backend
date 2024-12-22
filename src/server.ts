import express from 'express';
import cors from 'cors';
import coinbaseRoutes from './routes/coinbaseRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.use('/api', coinbaseRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;