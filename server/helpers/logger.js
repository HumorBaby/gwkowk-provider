const winston = require('winston')

const myFormat = winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)

const options = {
  console: {
    level: process.env.WINSTON_LOG_LEVEL || 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.prettyPrint(JSON.stringify),
      myFormat
    ),
    colorize: true
  }
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})

logger.stream = {
  write: function (message, encoding) {
    logger.info(message.trim())
  }
}

module.exports = logger
