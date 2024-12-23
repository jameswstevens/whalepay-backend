import express from 'express';
import { coinbaseService } from '../services/coinbaseService';

const router = express.Router();

// ONRAMP

// Get quote for buying crypto
router.post('/onramp-quote', async (req, res) => {
    try {
        const quote = await coinbaseService.getOnrampQuote(req.body);
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get options for buying crypto
router.get('/onramp-options', async (req, res) => {
    console.log('Getting options');
    try {
        const country = req.query.country as string;
        const subdivision = req.query.subdivision as string;
        const options = await coinbaseService.getOnrampOptions(country, subdivision);
        res.json(options);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// OFFRAMP

// Get offramp configuration (supported countries and payment methods)
router.get('/offramp-config', async (req, res) => {
    try {
        const config = await coinbaseService.getOfframpConfig();
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get offramp options (available currencies and payment methods)
router.get('/offramp-options', async (req, res) => {
    try {
        const country = req.query.country as string;
        const subdivision = req.query.subdivision as string;
        const options = await coinbaseService.getOfframpOptions(country, subdivision);
        res.json(options);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get offramp quote for selling crypto
router.post('/offramp-quote', async (req, res) => {
    try {
        const quote = await coinbaseService.getOfframpQuote(req.body);
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;