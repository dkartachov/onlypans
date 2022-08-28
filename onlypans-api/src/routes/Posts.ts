import { Router } from 'express';
import STATUS from '../utils/Status';
import MESSAGE from '../utils/Messages';
import Token from '../types/Token';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body.auth as Token;
});

router.get('/', async (req, res) => {
  res.json('get posts');
});

export default router;