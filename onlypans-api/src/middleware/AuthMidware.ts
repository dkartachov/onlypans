import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import MESSAGE from '../utils/Messages';
import STATUS from '../utils/Status';
import Token from '../types/Token';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];

  if (accessToken == null) {
    return res.status(STATUS.FORBIDDEN).json(MESSAGE.CUSTOM('Forbidden', 'Missing access token'));
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET ?? '') as Token;

    req.body.auth = {};
    req.body.auth = decoded;
  } catch (e) {
    return res.status(STATUS.UNAUTHORIZED).json(MESSAGE.CUSTOM('Unauthorized', 'Invalid access token'));
  }

  next();
};