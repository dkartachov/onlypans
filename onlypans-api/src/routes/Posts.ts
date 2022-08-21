import { Router } from 'express';
// import sql from '../db/db.js';
import STATUS from '../utils/Status';
import MESSAGE from '../utils/Messages';
// import Post from '../db/models/post.js';
import Token from '../types/token';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req.body.auth as Token;
});

router.get('/', async (req, res) => {
  res.json('get posts');
});

export default router;