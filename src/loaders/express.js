import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config';
import routes from '../routes';
import Logger from './logger';
import client from '../helpers/redis.helper';

export default ({
  app
}) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Nginx, etc)
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  /**
   * Middleware logger request
   * @ref https://anonystick.com/blog-developer/3-middleware-huu-ich-khi-su-dung-express-rest-api-2019112318055877
   * */
  app.use(morgan('combined', {
    stream: Logger.stream
  }));

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');

    // add this line to include winston logging
    Logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {

      // add this line to include winston logging
      Logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

      return res
        .status(err.status)
        .send({
          message: err.message
        })
        .end();
    }

    return next(err);
  });

  app.use((err, req, res, next) => {
    // add this line to include winston logging
    Logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};