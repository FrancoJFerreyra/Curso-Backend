import {transports, format, createLogger}  from "winston";

const loggerW = createLogger({
    format : format.combine(format.colorize()),
    transports:[
        new transports.Console({level: 'verbose'}),
        new transports.Console({level: 'info'}),
        new transports.Console({level: 'fatal'}),
        new transports.Console({level: 'error'}),
    ]
})

module.exports = loggerW;