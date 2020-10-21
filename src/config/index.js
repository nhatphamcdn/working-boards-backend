import database from './database';
// Require env
const env = require('./env');

export default {
  /**
   * Your favorite port
   */
  port: parseInt(env.PORT, 10),

  /**
   * That long string from mlab
   */
  database: database,

  /**
   * Your secret sauce
   */
  jwtSecret: env.JWT_SECRET,
  jwtAlgorithm: env.JWT_ALGO,
  tokenLife: env.TOKEN_LIFE,
  jwtSecretRefresh: env.JWT_SECRET_REFRESH,
  tokenLifeRefresh: env.TOKEN_REFRESH_LIFE,

  /**
   * Used by winston logger
   */
  logs: {
    level: env.LOG_LEVEL || 'silly',
    path: '/Library/WebServer/Documents/kin-devs/task-management/working-boards-backend/logs',
    filename: 'working-boards.log'
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};