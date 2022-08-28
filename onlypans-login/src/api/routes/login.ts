import { Router } from 'express';
import STATUS from '../../utils/status';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(STATUS.BAD_REQUEST).json('Missing username and/or password');
  }

  
});

export default router;