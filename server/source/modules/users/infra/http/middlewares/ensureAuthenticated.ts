import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  const decoded = verify(token, AuthConfig.jwt.secret);

  const { sub } = decoded as ITokenPayload;
  request.user = {
    id: sub,
  };

  return next();
}
