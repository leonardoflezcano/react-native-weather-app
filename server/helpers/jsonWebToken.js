import jwt from 'jsonwebtoken';
import { key } from '../config/conf';

export const generateToken = (payload) => {
  return jwt.sign(payload, key, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, key);
};