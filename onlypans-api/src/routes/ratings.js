import { Router } from 'express';
import sql from '../db/db.js';
import Rating from '../db/models/rating.js';
import STATUS from '../utils/status.js';
import MESSAGE from '../utils/messages.js';

const router = Router();

router.get('/', async (req, res) => {
  const { userId } = req.body;

  const records = await sql`SELECT * FROM ratings r
  JOIN posts p
    ON p.post_id = r.post_id
  JOIN users u
    ON u.user_id = r.rated_by_id
  WHERE rated_by_id = ${userId}`;

  const ratings = [];

  records.forEach(record => ratings.push(Rating(record)));

  res.status(STATUS.OK).json(ratings);
});

router.post('/', async (req, res) => {
  const { userId, id, rating } = req.body;

  if (rating == null) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.CUSTOM('Invalid request', 'Body must contain \'rating\' parameter, set to either one of \'like\', \'dislike\' or \'neutral\''));
  }

  if (!['like', 'dislike', 'neutral'].includes(rating)) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.CUSTOM('Invalid request', 'Rating must be set to either \'like\', \'dislike\' or \'neutral\''));
  }

  const ratingRecord = await sql`SELECT * FROM ratings WHERE post_id = ${id} AND rated_by_id = ${userId}`;

  if (ratingRecord.length > 0) {
    const ratingId = ratingRecord[0].rating_id;

    switch (rating) {
      case 'like':
        await sql`UPDATE ratings SET liked = true, disliked = false WHERE rating_id = ${ratingId}`;
        break;
      case 'dislike':
        await sql`UPDATE ratings SET liked = false, disliked = true WHERE rating_id = ${ratingId}`;
        break;
      case 'neutral':
        await sql`UPDATE ratings SET liked = false, disliked = false WHERE rating_id = ${ratingId}`;
        break;
    }
  } else {
    const newRating = {
      post_id: id,
      rated_by_id: userId,
      liked: rating === 'like',
      disliked: rating === 'dislike'
    };
  
    await sql`INSERT INTO ratings ${sql(newRating)}`;
  }

  const updatedRating = (await sql`SELECT * FROM ratings WHERE post_id = ${id} AND rated_by_id = ${userId}`)[0];

  res.status(STATUS.OK).json(Rating(updatedRating));
});

export default router;