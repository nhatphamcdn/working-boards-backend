import AuthService from '../services/auth.service';
import client from '../helpers/redis.helper';

export default class AuthController {
  constructor() {
    this.auth = new AuthService();
  }

  async signUp(res, payload) {
    global.logger.debug('Calling Sign-Up endpoint with body: %o', payload);
    const {
      user,
      accessToken,
      refreshToken
    } = await this.auth.signUp(payload);

    return res.status(201).json({
      user,
      accessToken,
      refreshToken
    });
  }

  async signIn(res, payload) {
    global.logger.debug('Calling Sign-In endpoint with body: %o', payload);
    const {
      user,
      accessToken,
      refreshToken
    } = await this.auth.signIn(payload);
    // return response json
    return res.status(201).json({
      user,
      accessToken,
      refreshToken
    });
  }

  async refreshToken(res, payload) {
    global.logger.debug('Calling Refresh Token endpoint with body: %o', payload);
    const {
      accessToken,
      refreshToken
    } = await this.auth.refreshToken(payload);
    // return response json
    return res.status(201).json({
      accessToken,
      refreshToken
    });
  }

  async logout(res, payload) {
    global.logger.debug('Calling Logout endpoint');
    const userId = await this.auth.logout(payload);
    global.logger.silly('AuthController@logout: Delete user from redis.');
    return client.DEL(userId, (err, val) => {
      if (err) {
        global.logger.error('Delete userID from redis fail');
        throw createError.InternalServerError();
      }

      return res.sendStatus(204);
    });
  }
}