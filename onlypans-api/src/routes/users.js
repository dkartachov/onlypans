import { Router } from 'express';
import likes from './likes.js';
import sql from '../db/db.js';
import STATUS from '../utils/status.js';
import MESSAGE from '../utils/messages.js';
import User from '../db/models/user.js';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_PARAMETER(id, 'id', 'integer'));
  }

  const records = await sql`SELECT * FROM users WHERE user_id = ${id}`;
  
  if (records.length < 1) {
    return res.status(STATUS.NOT_FOUND).json(MESSAGE.NOT_FOUND('User', id));
  }

  const user = records[0];

  res.status(STATUS.OK).json(User(user));
});

router.get('/', async (req, res) => {
  const limit = req.query.limit || 10;

  if (!Number.isInteger(parseInt(limit))) {
    res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_QUERY_PARAMETER(req.query.limit, 'limit', 'integer'));

    return;
  }

  const records = await sql`SELECT * FROM users
  ORDER BY user_id DESC
  LIMIT ${limit}`;

  const users = [];

  records.forEach(record => users.push(User(record)));

  res.status(STATUS.OK).json(users);
});

router.use('/:id/likes', (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_PARAMETER(id, 'id', 'integer'));
  }

  req.body.userId = req.params.id;

  next();
}, likes);

export default router;