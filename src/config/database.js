const env = require('./env');

module.exports = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT || 3306,
  pool: env.DB_POOL || true,
  dialect: 'mysql'
};