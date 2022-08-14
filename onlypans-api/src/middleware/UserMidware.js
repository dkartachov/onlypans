import MESSAGE from '../utils/messages.js';
import STATUS from '../utils/status.js';

export default (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(STATUS.BAD_REQUEST).json(MESSAGE.INVALID_PARAMETER(id, 'id', 'integer'));
  }

  req.body.userId = req.params.id;

  next();
}