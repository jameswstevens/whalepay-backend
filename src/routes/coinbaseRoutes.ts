import { Router, Request, Response } from 'express';
import { coinbaseService } from '../services/coinbaseService';

const router = Router();

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

// Get transactions for an address
router.get('/transactions/:address', async (req, res) => {
    try {
        const { address } = req.params;
        const transactions = await coinbaseService.getTransactions(address);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get offramp transaction status
router.get('/offramp-transaction/:partnerUserId', async (req, res) => {
    try {
        const { partnerUserId } = req.params;
        const status = await coinbaseService.getOfframpTransactionStatus(partnerUserId);
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get offramp transactions for a user
router.get('/offramp-transactions/:partnerUserId', async (req, res) => {
    try {
        const { partnerUserId } = req.params;
        const { page_key, page_size } = req.query;
        
        const transactions = await coinbaseService.getOfframpTransactions(
            partnerUserId,
            page_key as string,
            page_size ? parseInt(page_size as string) : undefined
        );
        
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get most recent offramp transaction for a user
router.get('/latest-offramp-transaction/:partnerUserId', async (req, res) => {
    try {
        const { partnerUserId } = req.params;
        
        const transactions = await coinbaseService.getOfframpTransactions(
            partnerUserId,
            undefined,
            1
        );
        
        const latestTransaction = transactions.transactions[0];
        res.json({ transaction: latestTransaction });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;