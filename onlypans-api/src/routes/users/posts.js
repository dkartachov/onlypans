import { Router } from 'express';
import sql from '../../db/db.js';
import Post from '../../db/models/post.js';
import STATUS from '../../utils/status.js';

const router = Router();

router.get('/', async (req, res) => {
  const { userId } = req.body;

  const records = await sql`SELECT * FROM posts WHERE user_id = ${userId}`;

  const posts = [];

  records.forEach(record => posts.push(Post(record)));

  res.status(STATUS.OK).json(posts);
});

router.post('/', async (req, res) => {
  const { userId, post } = req.body;

  const record = (await sql`INSERT INTO posts (user_id, content) VALUES (${userId}, ${post.content}) RETURNING *`)[0];

  res.status(STATUS.CREATED).json(Post(record));
});

export default router;