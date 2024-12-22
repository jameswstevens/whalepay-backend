import express from 'express';
import { coinbaseService } from '../services/coinbaseService';

const router = express.Router();

// Get quote for buying crypto
router.post('/quote', async (req, res) => {
    try {
        const quote = await coinbaseService.getQuote(req.body);
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get options for buying crypto
router.get('/options', async (req, res) => {
    console.log('Getting options');
    try {
        const country = req.query.country as string;
        const subdivision = req.query.subdivision as string;
        const options = await coinbaseService.getOptions(country, subdivision);
        res.json(options);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;