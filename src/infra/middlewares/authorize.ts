import { NextFunction, Request, Response } from 'express';

export function authorize() {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('authorize middleware');

    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // decodificar o token
    req.userId = 1;

    next();
  };
}
