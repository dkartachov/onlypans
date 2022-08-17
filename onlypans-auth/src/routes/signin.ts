import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  res.json('signin hit');
});

export default router;