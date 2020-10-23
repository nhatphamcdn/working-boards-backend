import {
  Router
} from 'express';
import middlewares from '../middlewares';
import UserController from '../controllers/user.controller';
import catchAsync from '../helpers/catchAsync.helper';
const route = Router();

export default (app) => {
  app.use('/users', route);
  // Create instance user
  const userController = new UserController();

  route.get('/me', middlewares.verifyAccessToken, middlewares.attachCurrentUser, catchAsync((req, res, next) => userController.currentUser(res, req)));
};