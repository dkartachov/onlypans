import { Router } from 'express';
import db from '../db';
import MESSAGE from '../utils/Messages';
import STATUS from '../utils/Status';

interface Payload {
  query: string,
  method?: 'any' | 'none' | 'oneOrNone',
  params?: any[]
}

const router = Router();

router.post('/', async (req, res) => {
  const {
    query,
    method,
    params
  } = req.body as Payload

  try {
    const result = await db[method ?? 'any'](query, params);

    return res.json(result);
  } catch (error) {
    console.error(error);
    
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

export default router;