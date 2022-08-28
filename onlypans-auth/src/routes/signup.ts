import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../types/User';
import MESSAGE from '../utils/Messages';
import * as PansDb from '../utils/PansDb';
import STATUS from '../utils/Status';

interface Request {
  username: string,
  password: string,
  email: string
}

const router = Router();

router.post('/', async (req, res) => {
  const {
    username,
    password,
    email
  } = req.body as Request;

  if (!username || !password || !email) {
    return res.status(STATUS.BAD_REQUEST).json('Missing username and/or password and/or email');
  }

  // check if username is taken
  const user = await PansDb.Query<User>({
    method: 'oneOrNone',
    query: 'SELECT username FROM users WHERE username = $1',
    params: [username]
  });

  if (Object.keys(user ?? {}).length) {
    return res.status(STATUS.BAD_REQUEST).json('Username not available');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, salt);

    await PansDb.Query({
      method: 'none',
      query: 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
      params: [username, encrypted, email]
    });

    return res.status(STATUS.CREATED).json('User created');
  } catch (error) {
    console.log(error);

    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

export default router;