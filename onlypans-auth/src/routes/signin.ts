import { Router } from 'express';
import { getUser, User } from '../utils/OnlypansDb';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json('Missing username and/or password');
  }

  const user: User | null = await getUser(username);

  res.json(user);
});

export default router;