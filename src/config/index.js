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