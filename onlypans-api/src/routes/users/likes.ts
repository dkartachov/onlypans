import { Router } from 'express';
import Token from '../../types/Token';
import { MESSAGE, PansDB, STATUS } from '../../utils';

const router = Router();

router.get('/', async (req, res) => {
  const { userId: id } = req.body;
  const { userId } = req.body.token as Token;

  if (userId !== parseInt(id)) {
    return res.status(STATUS.FORBIDDEN).json('Get likes unauthorized: user ids do not match');
  }

  try {
    const likes = await PansDB.Query({
      method: 'any',
      query: 'SELECT * FROM likes WHERE liked_by = $1',
      params: [userId]
    });

    res.status(STATUS.OK).json(likes);
  } catch (error) {
    console.log(error);

    res.status(STATUS.INTERNAL_SERVER_ERROR).json(MESSAGE.GENERIC_SERVER_ERROR);
  }
});

router.post('/', async (req, res) => {

});

export default router;