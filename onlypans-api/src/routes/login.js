import { Router} from 'express';
import jwt from 'jsonwebtoken';

const users = [
  'deniskartachov',
  'charlieborzoi',
  'marmarodidi',
];

const router = Router();

router.post('/', (req, res) => {
  const { username } = req.body;

  if (!username) return res.status(404).json('User not provided');

  if (!users.includes(username)) {
    return res.status(404).json('User not found');
  }

  const accessToken = jwt.sign({ username }, process.env.ONLYPANS_API_SECRET);

  res.status(200).json({ accessToken });
});

export default router;