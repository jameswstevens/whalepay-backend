import { Router } from 'express';
import { supabaseService } from '../services/supabaseService';

const router = Router();

router.get('/users', async (req, res) => {
    try {
      const users = await supabaseService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

router.get('/users/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const user = await supabaseService.getUserByAddress(address);
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router; 