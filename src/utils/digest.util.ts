import { createHmac } from 'crypto';

export const digest = (password: string): string => {
  return createHmac('md5', process.env.PASSWORD_KEY)
    .update(password)
    .digest('hex');
};

export const check = (password: string, secret: string): boolean =>
  digest(password) === secret;
