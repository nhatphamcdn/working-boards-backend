import { user } from "../models";
import _ from "lodash";

export default class UserService {
  constructor() {
    this.user = user;
  }

  /**
   * TODO: get current User by Id
   * @params id
   */
  async getCurrentUser(id) {
    global.logger.silly('UserService@getCurrentUser: Find user by id');
    // Find or create user
    const userRecord = await this.user.findOne({
      where: { id },
    });

    // Check user has created?
    if (!userRecord) {
      global.logger.silly('UserService@getCurrentUser: User not found');
      return false;
    }

    const user = _.omit(userRecord.toJSON(), ["password"]);
    return user;
  }
}