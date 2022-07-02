import { Router } from 'express';
import Like from '../db/models/like.js';
import sql from '../db/db.js';
import STATUS from '../utils/status.js';
import MESSAGE from '../utils/messages.js';

const router = Router();

router.get('/', async (req, res) => {
  const { userId } = req.body;

  const records = await sql`SELECT * FROM likes l
  JOIN posts p
    ON p.post_id = l.post_id
  JOIN users u
    ON u.user_id = l.liked_by
  WHERE l.liked_by = ${userId}
  ORDER BY like_id DESC`;

  const likes = [];

  records.forEach(record => likes.push(Like(record)));

  res.status(STATUS.OK).json(likes);
});

router.post('/', async (req, res) => {
  const { userId, id } = req.body;

  if (id == null) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.MISSING_PARAMETERS(['id']));
  }

  const alreadyLiked = (await sql`SELECT like_id FROM likes WHERE post_id = ${id} AND liked_by = ${userId}`).length > 0

  if (alreadyLiked) {
    return res.status(STATUS.NOT_MODIFIED).json('Not modified');
  }

  const newLike = {
    post_id: id,
    liked_by: userId
  };

  await sql`INSERT INTO likes ${sql(newLike)}`;

  res.sendStatus(STATUS.OK);
});

router.delete('/:id', async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_PARAMETER(id, 'id', 'integer'));
  }

  const deleted = await sql`DELETE FROM likes WHERE liked_by = ${userId} AND post_id = ${id} RETURNING like_id`;

  if (deleted.length === 0) {
    return res.sendStatus(STATUS.NOT_FOUND);
  }

  res.sendStatus(STATUS.OK);
});

export default router;