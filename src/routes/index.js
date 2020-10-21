import {
  Router
} from 'express';
import user from './user';
import auth from './auth';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  user(app);
  auth(app);

  return app
}