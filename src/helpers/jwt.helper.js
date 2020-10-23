import jwt from 'jsonwebtoken';
import config from '../config';
import createError from 'http-errors';
import client from './redis.helper';

const signAccessToken = (userId) => {
  global.logger.silly(`Sign jwt for userId: ${userId}`);
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = config.accessToken
    const options = {
      expiresIn: '1h',
      issuer: 'working-boards.tech',
      audience: [userId],
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return false;
      }

      resolve(token);
    });
  })
}

const verifyAccessToken = (req, res, next) => {
  global.logger.silly(`Verify Acceess Token`);
  if (!req.headers['authorization']) {
    return next(createError.Unauthorized());
  }

  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];

  jwt.verify(token, config.accessToken, (err, payload) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      return next(createError.Unauthorized(message))
    }

    req.payload = payload;

    next();
  })
}

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {}
    const secret = config.refreshToken;
    const options = {
      expiresIn: '1w',
      issuer: 'working-boards.tech',
      audience: [userId],
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }

      client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return false;
        }

        resolve(token);
      });
    });
  })
}

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      config.refreshToken,
      (err, payload) => {
        if (err) {
          return reject(createError.Unauthorized());
        }

        const userId = payload.aud;

        client.GET(userId, (err, result) => {
          if (err) {
            console.log(err.message)
            reject(createError.InternalServerError());
            return false;
          }
          if (refreshToken === result) {
            return resolve(userId);
          }

          reject(createError.Unauthorized());
        });
      }
    )
  })
}

export {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
}