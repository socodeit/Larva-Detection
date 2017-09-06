/**
 * Configurations of logger.
 * https://stackoverflow.com/questions/8393636/node-log-in-a-file-instead-of-the-console/40906364#40906364
 */
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

const consoleConfig = [
    new winston.transports.Console({
        'colorize': true,
        timestamp: true
    })
];

const createLogger = new winston.Logger({
    'transports': consoleConfig
});

const successLogger = createLogger;
successLogger.add(winstonRotator, {
    'name': 'access-file',
    'level': 'info',
    'filename': './logs/access.log',
    'json': false,
    'datePattern': 'yyyy-MM-dd-',
    'prepend': true
});

const errorLogger = createLogger;
errorLogger.add(winstonRotator, {
    'name': 'error-file',
    'level': 'error',
    'filename': './logs/error.log',
    'json': false,
    'datePattern': 'yyyy-MM-dd-',
    'prepend': true
})

module.exports = {
    'successlog': successLogger,
    'errorlog': errorLogger
};