import winston from 'winston';
import config from '../config';
import fs from 'fs';
import appRoot from 'app-root-path';

const dir = config.logs.path;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const transports = [
  new winston.transports.Console(options.console),
  new winston.transports.File(options.file)
];

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({
      stack: true
    }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

// create a stream object with a 'write' function that will be used by `morgan`
LoggerInstance.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    LoggerInstance.info(message);
  },
};


export default LoggerInstance;