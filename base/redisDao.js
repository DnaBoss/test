"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDao = void 0;
var RedisDao = /** @class */ (function () {
    function RedisDao(pub, sub, client) {
        this.pub = pub;
        this.sub = sub;
        this.client = client;
    }
    return RedisDao;
}());
exports.RedisDao = RedisDao;
