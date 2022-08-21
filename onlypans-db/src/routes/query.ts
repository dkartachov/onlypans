import { Router } from 'express';
import db from '../db';

interface Payload {
  query: string,
  method?: 'oneOrNone' | 'all',
  params?: any[]
}

const router = Router();

router.post('/', async (req, res) => {
  const {
    query,
    method,
    params
  } = req.body as Payload

  const result = await db[method ?? 'all'](query, params);

  res.json(result);
});

export default router;