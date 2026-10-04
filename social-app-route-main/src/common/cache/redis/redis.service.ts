import {ICacheProvider} from "../cache.interface";
import {Promise} from "mongoose";
import {createClient, RedisClientType} from "redis";

interface RedisConfig {
    url: string
}


export class RedisCacheProvider implements ICacheProvider {
    private client: RedisClientType;

    constructor(config: RedisConfig) {
        this.client = createClient(config);
        this.client.connect().catch((err: Error) => {
            console.error(err);
        });
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key)
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key)
    }

    async set(key: string, value: string, ttlSeconds: number): Promise<void> {
        if (ttlSeconds) {
            await this.client.set(key, value, {EX: ttlSeconds})
        }
        await this.client.set(key, value);
    }
}