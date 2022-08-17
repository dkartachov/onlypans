import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  res.json('signout hit');
});

export default router;