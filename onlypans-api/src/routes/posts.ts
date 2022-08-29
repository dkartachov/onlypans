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
});

router.get('/', async (req, res) => {
  const { username } = req.body.token as Token;
  const { afterId } = req.query;

  try {
    const select = `
      l.post_id AS id,
      l.user_id AS "userId",
      u.username,
      l.content,
      l.likes,
      p.like_id,
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
        WHERE liked_by = (
          SELECT user_id FROM users
          WHERE username = $1
        )
        ${afterId ? `AND post_id < ${afterId}` : ''}
        ORDER BY post_id DESC
        LIMIT 10
      )
      SELECT ${select} FROM latest_posts AS l
      FULL OUTER JOIN posts_liked_by_user p
      ON l.post_id = p.post_id
      JOIN users u
      ON u.user_id = l.user_id`,
      params: [username]
    });

    res.status(STATUS.OK).json(posts);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

export default router;