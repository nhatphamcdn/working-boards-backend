import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (user) => {
  /**
   * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
   * The cool thing is that you can add custom properties a.k.a metadata
   * Here we are adding the userId, role and name
   * Beware that the metadata is public and can be decoded without _the secret_
   * but the client cannot craft a JWT to fake a userId
   * because it doesn't have _the secret_ to sign it
   * more information here: https://softwareontheroad.com/you-dont-need-passport
   */
  global.logger.silly(`Sign JWT for userId: ${user.id}`);
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
      id: user.id, // We are gonna use this in the middleware 'isAuth'
      displayName: user.displayName,
      exp: exp.getTime() / 1000,
    },
    config.jwtSecret
  );
}