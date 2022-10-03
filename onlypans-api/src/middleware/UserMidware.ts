import { NextFunction, Request, Response } from 'express';
import MESSAGE from '../utils/Messages';
import STATUS from '../utils/Status';

export default (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return res.status(STATUS.BAD_REQUEST).json('No user supplied');
  }

  req.body.userId = id;

  next();
}