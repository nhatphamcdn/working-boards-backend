import {
  Router
} from 'express';
import middlewares from '../middlewares';
import createUserValidate from '../validates/createUser.validate';
import signInValidate from '../validates/signIn.validate';
import validation from '../helpers/validation.helper';
import catchAsync from '../helpers/catchAsync.helper';
import AuthController from '../controllers/auth.controller';

const route = Router();

export default (app) => {
  app.use('/auth', route);
  // create instance authController
  const authController = new AuthController();
  route.post('/sign-in', validation(signInValidate), catchAsync((req, res, next) => authController.signIn(res, req.body)));
  route.post('/sign-up', validation(createUserValidate), catchAsync((req, res, next) => authController.signUp(res, req.body)));
  route.delete('/logout', middlewares.verifyAccessToken, catchAsync((req, res, next) => authController.logout(res, req.body)));
};