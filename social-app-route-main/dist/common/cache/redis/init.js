"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisCacheProvider = void 0;
const redis_service_1 = require("./redis.service");
const config_1 = require("../../../config");
exports.redisCacheProvider = new redis_service_1.RedisCacheProvider({
    url: config_1.REDIS_URL
});
