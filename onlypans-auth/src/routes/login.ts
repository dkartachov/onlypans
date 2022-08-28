import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as PansDb from '../utils/PansDb';
import User from '../types/User';
import Token from '../types/Token';
import MESSAGE from '../utils/Messages';
import STATUS from '../utils/Status';

interface Request {
  username: string,
  password: string
}

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body as Request;

  if (!username || !password) {
    return res.status(STATUS.BAD_REQUEST).json('Missing username and/or password');
  }

  const payload: PansDb.Payload = {
    method: 'oneOrNone',
    query: 'SELECT user_id AS id, username, password, email FROM users WHERE username = $1',
    params: [username]
  };

  const user = await PansDb.Query<User>(payload);

  if (user == null || Object.keys(user).length === 0) {
    return res.status(STATUS.NOT_FOUND).json(MESSAGE.NOT_FOUND('User', username));
  }

  const authenticated = await bcrypt.compare(password, user.password ?? '');

  if (!authenticated) {
    return res.status(STATUS.FORBIDDEN).json(MESSAGE.GENERIC_FORBIDDEN);
  }

  const token: Token = {
    userId: user.id,
    username: user.username,
    email: user.email
  };

  const encoded = jwt.sign(token, process.env.API_SECRET!);

  res.status(STATUS.OK).json({
    token: encoded
  });
});

export default router;