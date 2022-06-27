import { Router } from 'express';
import jwt from 'jsonwebtoken';
import sql from '../db/db.js';
import STATUS from '../utils/status.js';
import MESSAGE from '../utils/messages.js';
import Post from '../db/models/post.js';

const router = Router();

// router.get('/', async (req, res) => {
//   const limit = req.query.limit || 10;

//   if (!Number.isInteger(parseInt(limit))) {
//     res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_QUERY_PARAMETER(req.query.limit, 'limit', 'integer'));

//     return;
//   }

//   const select = [
//     'p.post_id',
//     'p.user_id',
//     'u.username',
//     'p.content',
//     'p.media_url',
//     'p.likes',
//     'p.dislikes',
//     'p.posted_date',
//   ];
  
//   const records = await sql`SELECT ${sql(select)} FROM posts p JOIN users u ON p.user_id = u.user_id ORDER BY posted_date DESC LIMIT ${limit}`;
//   const posts = [];

//   records.forEach(record => posts.push(Post(record)));

//   res.status(STATUS.OK).json(posts);
// });

router.get('/', async (req, res) => {
  const limit = req.query.limit || 10;

  if (!Number.isInteger(parseInt(limit))) {
    res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_QUERY_PARAMETER(req.query.limit, 'limit', 'integer'));

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
    'l.dislikes', 
    'l.posted_date', 
    'p.liked', 
    'p.disliked' 
  ];

  const records = await sql`
  WITH latest_posts AS (
    SELECT * FROM posts
    ORDER BY post_id DESC
    LIMIT ${limit}
  ), posts_rated_by_user AS (
    SELECT * FROM ratings
    WHERE rated_by_id = (
      SELECT user_id FROM users 
      WHERE username = ${user}
    )
    ORDER BY post_id DESC
    LIMIT ${limit}
  )
  SELECT ${sql(select)} 
  FROM latest_posts AS l
  FULL OUTER JOIN posts_rated_by_user p
  ON l.post_id = p.post_id
  JOIN users u
  ON u.user_id = l.user_id`;

  const posts = [];

  records.forEach(record => posts.push(Post(record)));

  res.status(STATUS.OK).json(posts);
});

export default router;