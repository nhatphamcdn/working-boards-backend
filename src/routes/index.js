import {
  Router
} from 'express';
import user from './user';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  user(app);

  return app
}