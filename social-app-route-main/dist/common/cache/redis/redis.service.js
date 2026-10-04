"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheProvider = void 0;
const redis_1 = require("redis");
class RedisCacheProvider {
    client;
    constructor(config) {
        this.client = (0, redis_1.createClient)(config);
        this.client.connect().catch((err) => {
            console.error(err);
        });
    }
    async delete(key) {
        await this.client.del(key);
    }
    async get(key) {
        return await this.client.get(key);
    }
    async set(key, value, ttlSeconds) {
        if (ttlSeconds) {
            await this.client.set(key, value, { EX: ttlSeconds });
        }
        await this.client.set(key, value);
    }
}
exports.RedisCacheProvider = RedisCacheProvider;
