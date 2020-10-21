import {
  Router
} from 'express';
import middlewares from '../middlewares';
import createUserValidate from '../validates/createUser.validate';
import signInValidate from '../validates/signIn.validate';
import validation from '../helpers/validation';
import catchAsync from '../helpers/catchAsync';
import AuthController from '../controllers/auth.controller';

const route = Router();

export default (app) => {
  app.use('/auth', route);
  // create instance authController
  const authController = new AuthController();
  route.post('/sign-in', validation(signInValidate), catchAsync((req, res, next) => authController.signIn(res, req.body)));
  route.post('/sign-up', validation(createUserValidate), catchAsync((req, res, next) => authController.signUp(res, req.body)));
  route.post('/logout', middlewares.isAuth, catchAsync((req, res, next) => {
    global.logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    //!TODO authController.Logout(req.user) do some clever stuff
    return res.status(200).end();
  }));
};