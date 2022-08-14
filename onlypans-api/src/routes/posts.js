import { Router } from 'express';
import sql from '../db/db.js';
import STATUS from '../utils/status.js';
import MESSAGE from '../utils/messages.js';
import Post from '../db/models/post.js';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_PARAMETER(id, 'id', 'integer'));
  }

  const { user } = req.body.auth;

  const select = [
    'l.post_id',
    'l.user_id',
    'u.username',
    'l.content', 
    'l.media_url',
    'l.likes',
    'p.like_id',
    'l.posted_date' 
  ];

  const record = (await sql`
  WITH latest_post AS (
    SELECT * FROM posts
    WHERE post_id = ${id}
  ), post_liked_by_user AS (
    SELECT * FROM likes
    WHERE liked_by = (
      SELECT user_id FROM users
      WHERE username = ${user}
    )
    AND post_id = ${id}
  )
  SELECT ${sql(select)} 
  FROM latest_post AS l
  FULL OUTER JOIN post_liked_by_user p
  ON l.post_id = p.post_id
  JOIN users u
  ON u.user_id = l.user_id`)[0];

  res.status(STATUS.OK).json(Post(record));
});

router.get('/', async (req, res) => {
  const limit = req.query.limit || 10;
  const { afterId } = req.query;

  if (!Number.isInteger(parseInt(limit))) {
    res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_QUERY_PARAMETER(req.query.limit, 'limit', 'integer'));

    return;
  }

  if (afterId && !Number.isInteger(parseInt(afterId))) {
    res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_QUERY_PARAMETER(req.query.afterId, 'afterId', 'integer'));

    return;
  }

  const { user } = req.body.auth;

  const select = [
    'l.post_id',
    'l.user_id',
    'u.username',
    'l.content', 
    'l.media_url',
    'l.likes',
    'p.like_id',
    'l.posted_date' 
  ];

  const records = await sql`
  WITH latest_posts AS (
    SELECT * FROM posts
    ${afterId ? sql`WHERE post_id < ${afterId}` : sql``}
    ORDER BY post_id DESC
    LIMIT ${limit}
  ), posts_liked_by_user AS (
    SELECT * FROM likes
    WHERE liked_by = (
      SELECT user_id FROM users 
      WHERE username = ${user}
    )
    ${afterId ? sql`AND post_id < ${afterId}` : sql``}
    ORDER BY post_id DESC
    LIMIT ${limit}
  )
  SELECT ${sql(select)} 
  FROM latest_posts AS l
  FULL OUTER JOIN posts_liked_by_user p
  ON l.post_id = p.post_id
  JOIN users u
  ON u.user_id = l.user_id`;

  const posts = [];

  records.forEach(record => posts.push(Post(record)));

  res.status(STATUS.OK).json(posts);
});

export default router;