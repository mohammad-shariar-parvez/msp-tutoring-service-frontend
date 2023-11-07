import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const verifyToken = (token: string, secret: Secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

export const jwtHelpers = { verifyToken };
