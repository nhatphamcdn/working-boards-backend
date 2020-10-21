import UserService from '../services/user.service';

export default class UserController {
  constructor() {
    this.user = new UserService();
  }

  async currentUser(res, req) {
    global.logger.debug('Get curren user endpoint with body: %o');
    return res.status(200).json({
      user: req.currentUser
    });
  }

  logout() {

  }
}