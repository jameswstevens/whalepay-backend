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

// Add this new route
router.get('/permissions', async (req, res) => {
    try {
        const permissions = await coinbaseService.getKeyPermissions();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;