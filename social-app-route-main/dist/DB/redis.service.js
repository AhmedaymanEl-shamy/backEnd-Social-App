"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIntoCache = setIntoCache;
exports.getFromCache = getFromCache;
exports.deleteFromCache = deleteFromCache;
const redis_connect_1 = require("./redis.connect");
async function setIntoCache(key, value, expiration) {
    redis_connect_1.redisClient.set(key, value, { expiration: { type: "EX", value: expiration } });
}
async function getFromCache(key) {
    return redis_connect_1.redisClient.get(key);
}
async function deleteFromCache(key) {
    return redis_connect_1.redisClient.del(key);
}
