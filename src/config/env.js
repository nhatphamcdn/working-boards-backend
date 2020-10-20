// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Require env file by environment
const envConfig = require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

if (envConfig.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = process.env;