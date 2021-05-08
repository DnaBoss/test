"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TritonNodeHub = void 0;
var TritonNodeHub = /** @class */ (function () {
    function TritonNodeHub() {
        this.nodeDict = {};
    }
    TritonNodeHub.prototype.addNode = function (instanceId, socket) {
        this.nodeDict[instanceId] = socket;
        return this.nodeDict;
    };
    TritonNodeHub.prototype.removeNode = function (instanceId) {
        this.nodeDict = this.nodeDict || {};
        this.nodeDict[instanceId] = undefined;
        return this.nodeDict;
    };
    TritonNodeHub.prototype.getNode = function (instanceId) {
        this.nodeDict = this.nodeDict || {};
        return this.nodeDict[instanceId];
    };
    TritonNodeHub.prototype.closeNode = function (instanceId) {
        this.nodeDict = this.nodeDict || {};
        return this.nodeDict[instanceId].close();
    };
    return TritonNodeHub;
}());
exports.TritonNodeHub = TritonNodeHub;
