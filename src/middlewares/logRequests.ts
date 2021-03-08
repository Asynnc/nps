import { Request, Response, NextFunction } from 'express'

export default function logRequests(req: Request, res: Response, next: NextFunction) {
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.log(logLabel);
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

