import { Router } from 'express';
import Post from '../types/api/Post';
import User from '../types/api/User';
import Token from '../types/Token';
import MESSAGE from '../utils/Messages';
import * as PansDB from '../utils/PansDB';
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
    const users = await PansDB.Query<User[]>({
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
    const user = await PansDB.Query<User>({
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

router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body.token as Token;

  if (userId !== parseInt(id)) {
    return res.status(STATUS.FORBIDDEN).json('Get posts unauthorized: user ids do not match');
  }

  try {
    const select = `
      p.post_id AS id,
      p.user_id AS "userId",
      u.username,
      p.content,
      p.likes,
      CASE 
        WHEN l.like_id IS NULL THEN false 
        ELSE true 
      END AS liked,
      p.comments`;
      
    const posts = await PansDB.Query<Post[]>({
      method: 'any',
      query: `SELECT ${select} FROM posts p
        LEFT JOIN likes l
        ON l.post_id = p.post_id
        JOIN users u
        ON u.user_id = p.user_id
        WHERE u.user_id = $1`,
      params: [id]
    });

    res.status(STATUS.OK).json(posts);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

router.post('/:id/posts', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body.token as Token;
  const { content } = req.body;

  if (userId !== parseInt(id)) {
    return res.status(STATUS.FORBIDDEN).json('Create post unauthorized: user ids do not match');
  }

  if (!content) {
    return res.status(STATUS.BAD_REQUEST).json('Missing content');
  }

  try {
    await PansDB.Query({
      method: 'none',
      query: 'INSERT INTO posts (user_id, content) VALUES ($1, $2)',
      params: [userId, content]
    });

    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

export default router;