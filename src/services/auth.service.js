import { user } from "../models";
import bcrypt from 'bcryptjs';
import _ from "lodash";
import { generateToken } from '../helpers/jwt.helper';

export default class AuthService {
  constructor() {
    this.user = user;
  }

  /**
   * TODO: Find user by email and create new user if not exist.
   * @params payload Object
   */
  async signUp(payload) {
    global.logger.silly('AuthService@signUp: Find or create user');
    // Find or create user
    const [ userRecord, created ] = await this.user.findOrCreate({
      where: {
        email: payload.email
      },
      defaults: {
        ...payload
      }
    });
    // Check user has created?
    if (!created) {
      global.logger.silly('AuthService@signUp: User already exist');
      throw new Error('User already exist');
    }
    //  Generating JWT
    global.logger.silly('AuthService@signUp: Generating JWT');
    const token = generateToken(userRecord);
    global.logger.silly('AuthService@signUp: User already exist');
    const user = _.omit(userRecord.toJSON(), ["password"]);
    return { user, token };
  }

  async signIn({email, password}) {
    const userRecord = await this.user.findOne({
      where: {
        email: email
      }
    });

    global.logger.silly('Checking user');
    if (!userRecord || !bcrypt.compareSync(password, userRecord.password)) {
      throw new Error('User not found');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    global.logger.silly('Password is valid... Generating JWT');
    const token = generateToken(userRecord);
    const user = _.omit(userRecord.toJSON(), ["password"]);
    /**
     * Easy as pie, you don't need passport.js anymore :)
     */
    return { user, token };
  }
}