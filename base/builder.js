"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
var util = require('util');
var exec = require('child_process').exec;
// const exec = util.promisify(require('child_process').exec);
var Builder = /** @class */ (function () {
    function Builder() {
    }
    Builder.getInstance = function () {
        return Builder._instance = Builder._instance || new Builder();
    };
    Builder.prototype.getClass = function (fileName) {
        var currentFold = __dirname;
        var path = currentFold + "/" + fileName;
        var exportObject = require(path);
        ;
        var className = '';
        Object.keys(exportObject).forEach(function (name) { return className = name; });
        var specifyClass = exportObject[className];
        return specifyClass;
    };
    Builder.prototype.buildTritonNode = function (ip, port, service) {
        var currentFold = __dirname;
        var ssh = "ssh 13.212.70.13 cd /test/base node proxy.js 3310";
        exec(ssh, function (error, stdout, stderr) {
            console.log('error = ', error);
            console.log('stdout = ', stdout);
            console.log('stderr = ', stderr);
        });
    };
    Builder.prototype.getServersConfig = function (env) {
        var serversConfig = require('../config/servers.json');
        console.log('serversConfig[env] =', serversConfig[env]);
    };
    return Builder;
}());
exports.Builder = Builder;
console.log('process.argv = ', process.argv);
var env = process.argv[process.argv.length - 1];
var builder = Builder.getInstance();
// builder.buildTritonNode('127.0.0.1', 5566, 'TritonNode')
// let sepcClass = builder.getClass('tritonNode');
builder.buildTritonNode('13.212.70.13', 5566, 'tritonNode');
// builder.getServersConfig(env);
