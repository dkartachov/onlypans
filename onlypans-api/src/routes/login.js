import { Router} from 'express';
import axios from 'axios';
import sql from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import STATUS from '../utils/status.js';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const body = {
    method: 'one',
    query: `SELECT username FROM users WHERE username = '${username}'`
  };

  // check if user exists
  const { data } = await axios.post(`${process.env.ONLYPANS_DB_URL}/query`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  res.json(data);
});

// router.post('/', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     const parameters = [];

//     !username && parameters.push('username');
//     !password && parameters.push('password');

//     res.status(STATUS.BAD_REQUEST).json({
//       message: 'missing parameters',
//       parameters,
//     }); 
    
//     return;
//   }

//   const query = await sql`SELECT user_id, password FROM users WHERE username = ${username}`;

//   if (query.length < 1) {
//     res.status(STATUS.NOT_FOUND).json({
//       message: 'User not found'
//     });

//     return;
//   }

//   const hash = query[0].password;
//   const valid = await bcrypt.compare(password, hash);

//   if (!valid) {
//     res.status(STATUS.FORBIDDEN).json({
//       message: 'Incorrect password'
//     });

//     return;
//   }

//   const userId = query[0].user_id;
//   const payload = {
//     user: username,
//     userId
//   };

//   const accessToken = jwt.sign(payload, process.env.ONLYPANS_API_SECRET);

//   res.status(STATUS.OK).json({
//     message: 'Login successful',
//     accessToken
//   });
// });

export default router;