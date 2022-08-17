import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  res.json('signup hit');
});

export default router;