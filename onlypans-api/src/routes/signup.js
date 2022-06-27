import { Router } from 'express';
import bcrypt from 'bcrypt';
import sql from '../db/db.js';
import status from '../utils/status.js';

const router = Router();

router.post('/', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    const parameters = [];

    !email && parameters.push('email');
    !username && parameters.push('username');
    !password && parameters.push('password');

    res.status(status.BAD_REQUEST).json({
      message: 'missing parameters',
      parameters,
    });

    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      email,
      username,
      password: passwordHash
    };

    await sql`INSERT INTO users ${sql(user, 'email', 'username', 'password')}`;
    
  } catch (e) {
    console.error(e);

    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong server side'
    });

    return;
  }

  res.status(status.OK).json({
    message: 'Signed up successfully!'
  });
});

export default router;