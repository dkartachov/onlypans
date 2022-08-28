import { Router } from 'express';
import User from '../types/api/User';
import MESSAGE from '../utils/Messages';
import * as PansDb from '../utils/PansDB';
import STATUS from '../utils/Status';

interface Query {
  limit?: string
}

const queryDefaults: Query = {
  limit: '10'
};

const router = Router();

router.get('/', async (req, res) => {
  const query: Query = req.query;

  if (query.limit) {
    const num = Number(query.limit);

    if (!Number.isInteger(num) || num < 0) {
      return res.status(STATUS.BAD_REQUEST).json('limit must be a positive integer');
    }
  }

  try {
    const users = await PansDb.Query<User[]>({
      method: 'any',
      query: `SELECT user_id AS id, username, email FROM users LIMIT $1`,
      params: [query.limit || queryDefaults.limit]
    });

    res.status(STATUS.OK).json(users);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await PansDb.Query<User>({
      method: 'oneOrNone',
      query: 'SELECT user_id AS id, username, email FROM users WHERE user_id = $1',
      params: [req.params.id]
    });

    if (Object.keys(user).length === 0) {
      return res.status(STATUS.NOT_FOUND).json(MESSAGE.GENERIC_NOT_FOUND);
    }

    res.status(STATUS.OK).json(user);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

export default router;