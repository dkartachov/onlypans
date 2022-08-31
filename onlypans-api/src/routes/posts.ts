import { Router } from 'express';
import * as PansDB from '../utils/PansDB';
import STATUS from '../utils/Status';
import MESSAGE from '../utils/Messages';
import Token from '../types/Token';
import Post from '../types/api/Post';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const token: Token = req.body.token;
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
    p.comments
  `;

  try {
    const post = await PansDB.Query<Post>({
      method: 'oneOrNone',
      query: `SELECT ${select} FROM posts p
        LEFT JOIN likes l
        ON l.post_id = p.post_id
        JOIN users u
        ON u.user_id = p.user_id
        WHERE p.post_id = $1`,
      params: [id]
    });

    res.status(STATUS.OK).json(post);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

router.get('/', async (req, res) => {
  const { userId } = req.body.token as Token;
  const { afterId } = req.query;

  try {
    const select = `
      l.post_id AS id,
      l.user_id AS "userId",
      u.username,
      l.content,
      l.likes,
      CASE 
        WHEN p.like_id IS NULL THEN false 
        ELSE true 
      END AS liked,
      l.comments`;

    const posts = await PansDB.Query<Post[]>({
      method: 'any',
      query: `WITH latest_posts AS (
        SELECT * FROM posts
        ${afterId ? `WHERE post_id < ${afterId}` : ''}
        ORDER BY post_id DESC
        LIMIT 10
      ), posts_liked_by_user AS (
        SELECT * FROM likes
        WHERE liked_by = $1
        ${afterId ? `AND post_id < ${afterId}` : ''}
        ORDER BY post_id DESC
        LIMIT 10
      )
      SELECT ${select} FROM latest_posts AS l
      FULL OUTER JOIN posts_liked_by_user p
      ON l.post_id = p.post_id
      JOIN users u
      ON u.user_id = l.user_id`,
      params: [userId]
    });

    res.status(STATUS.OK).json(posts);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

export default router;