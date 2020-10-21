import AuthService from '../services/auth.service';

export default class AuthController {
  constructor() {
    this.auth = new AuthService();
  }

  async signUp(res, payload) {
    global.logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    const { user, token } = await this.auth.signUp(payload);

    return res.status(201).json({user, token});
  }

  async signIn(res, payload) {
    global.logger.debug('Calling Sign-In endpoint with body: %o', req.body);
    const { user, token } = await this.auth.signIn(payload);
    // return response json
    return res.status(201).json({user, token});
  }

  logout() {

  }
}