import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.url} endpoint hit`);

  next();
}