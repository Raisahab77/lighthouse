// logger.js
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

// Logger configuration
const logger = createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  transports: [
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// Function to log errors with request context
function logError(message, req, res, status) {
  logger.error({
    message: message,
    status: status,
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    },
    user: req.user ? {
      id: req.user?.user_id,
    } : null,
    response:res,
    appVersion: process.env.npm_package_version,
    environment: process.env.NODE_ENV
  });
}

function logInfo(message, req,res, status) {
  logger.info({
    message: message,
    status: status,
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    },
    response:res,
    user: req.user ? {
      id: req.user?.user_id,
    } : null,
    appVersion: process.env.npm_package_version,
    environment: process.env.NODE_ENV
  });
}

function logWarning(message, req,res, status) {
  logger.warn({
    message: message,
    status: status,
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    },
    response:res,
    user: req.user ? {
      id: req.user?.user_id,
    } : null,
    appVersion: process.env.npm_package_version,
    environment: process.env.NODE_ENV
  });
}

module.exports = {
  logger,
  logError,
  logInfo,
  logWarning
};
