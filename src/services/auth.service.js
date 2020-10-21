import { user } from "../models";
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import _ from "lodash";


const generateToken = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

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

  return jwt.sign({
      id: user.id, // We are gonna use this in the middleware 'isAuth'
      displayName: user.displayName,
      exp: exp.getTime() / 1000,
    },
    config.jwtSecret
  );
}

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