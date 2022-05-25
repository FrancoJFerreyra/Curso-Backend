import winston from "winston";

const _loggerW = winston.createLogger({
  format: winston.format.combine(winston.format.simple()),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: `${__dirname}/../logs/error.log`,
      level: "error",
    }),
  ],
});

module.exports = _loggerW;
