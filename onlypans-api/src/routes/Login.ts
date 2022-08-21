import { Router } from 'express';
import MESSAGE from '../utils/Messages';
import * as PansDB from '../utils/PansDB';
import STATUS from '../utils/Status';

const router = Router();

router.post('/', async (req, res) => {
  const { username , password } = req.body;

  if (!username || !password) {
    return res.status(STATUS.BAD_REQUEST).json('Missing username and/or password');
  }

  const payload: PansDB.Payload = {
    query: 'SELECT username FROM users WHERE username = $1',
    method: 'oneOrNone',
    params: [username]
  };

  const user: {username: string} = await PansDB.Query(payload);

  if (user == null) {
    return res.status(STATUS.NOT_FOUND).json(MESSAGE.NOT_FOUND('User', username));
  }

  res.json(user);
});

export default router;