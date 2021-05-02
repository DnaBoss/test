"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var winston_1 = require("winston");
var combine = winston_1.format.combine, json = winston_1.format.json;
var file_base = path.resolve(__dirname, '../logs/');
var filename = path.resolve(file_base, "triton.log");
var TritonLogger = /** @class */ (function () {
    function TritonLogger() {
        this.transport = new transports.File({
            filename: filename,
            handleExceptions: true,
            level: 'debug'
        });
    }
    return TritonLogger;
}());
var transportList = [t1];
var timestamp = winston_1.format(function (info) {
    var d = new Date();
    info.timestamp =
        num2str(d.getFullYear(), 4) + "-" + num2str(d.getMonth() + 1, 2) + "-" + num2str(d.getDate(), 2)
            + " " + num2str(d.getHours(), 2) + ":" + num2str(d.getMinutes(), 2) + ":" + num2str(d.getSeconds(), 2)
            + "." + num2str(d.getMilliseconds(), 3);
    return info;
});
function num2str(val, n0) {
    var v = val.toString();
    return n0 <= v.length ? v : "0000".substr(0, n0 - v.length) + v;
}
var logger = winston_1.createLogger({
    format: combine(timestamp(), json()),
    transports: transportList
});
var switching = false;
function loggerWrapperDebug() {
    logger.debug.apply(null, arguments);
}
function loggerWrapperError() {
    logger.error.apply(null, arguments);
}
function loggerWrapperInfo() {
    logger.info.apply(null, arguments);
}
module.exports = {
    logger: {
        debug: loggerWrapperDebug,
        error: loggerWrapperError,
        info: loggerWrapperInfo
    }
};
