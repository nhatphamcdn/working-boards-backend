import {
  user
} from "../models";
import _ from "lodash";
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '../helpers/jwt.helper';

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
    const [userRecord, created] = await this.user.findOrCreate({
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
    //  Generating Access token and Refresh token
    global.logger.silly('AuthService@signUp: Generating JWT');
    const accessToken = await signAccessToken(userRecord.id);
    const refreshToken = await signRefreshToken(userRecord.id);
    global.logger.silly('AuthService@signUp: Return token');
    const user = _.omit(userRecord.toJSON(), ["password"]);

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async signIn({
    email,
    password
  }) {
    const userRecord = await this.user.findOne({
      where: {
        email: email
      }
    });

    global.logger.silly('Checking user');
    if (!userRecord) {
      throw createError.NotFound('User not exist');
    }

    if (!bcrypt.compareSync(password, userRecord.password)) {
      throw createError.NotFound('Invalid password');
    }

    global.logger.silly('AuthService@signIn: Generating JWT');
    const accessToken = await signAccessToken(userRecord.id);
    const refreshToken = await signRefreshToken(userRecord.id);
    const user = _.omit(userRecord.toJSON(), ["password"]);

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async refreshToken({
    refreshToken
  }) {
    global.logger.silly('AuthService@refreshToken: Check exist refresh token.');
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    global.logger.silly('AuthService@refreshToken: Verify refresh token.');
    const userId = await verifyRefreshToken(refreshToken)

    global.logger.silly('AuthService@refreshToken: Generating JWT');
    const accessToken = await signAccessToken(userId)
    const refreshNewToken = await signRefreshToken(userId)


    return {
      accessToken,
      refreshToken: refreshNewToken
    };
  }

  logout({
    refreshToken
  }) {
    global.logger.silly('AuthService@logout: Check exist refresh token.');
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    global.logger.silly('AuthService@logout: Verify refresh token.');
    return verifyRefreshToken(refreshToken)
  }
}