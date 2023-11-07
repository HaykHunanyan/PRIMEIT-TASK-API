const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);
const config = {
  logConfig: {
    logFolder: './/logs//',
    logFile: 'primeit-task-api-%DATE%.log',
  },
};
const transport = new DailyRotateFile({
  filename: config.logConfig.logFolder + config.logConfig.logFile,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: process.env.zippedLogArchive || true,
  maxSize: process.env.maxLogSize || '50m',
  maxFiles: process.env.maxLogFiles || '30d',
  prepend: true,
  level: config.logConfig.logLevel,
});
transport.on('rotate', function () {
  // call function like upload to s3 or on cloud
});
const logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});
module.exports = logger;
