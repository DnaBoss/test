"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessArgs = void 0;
var ProcessArgs = /** @class */ (function () {
    //   process.argv = "port=3310 mode=dev serverType=connector instanceId=connector_0 "
    function ProcessArgs() {
        this.instanceId = 'connector_0';
        this.port = '3310';
        this.mode = 'local';
        this.serverType = 'connector';
    }
    return ProcessArgs;
}());
exports.ProcessArgs = ProcessArgs;
