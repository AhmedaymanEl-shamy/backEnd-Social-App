import {redisClient} from "./redis.connect";

export async function setIntoCache(key: string, value: string | number, expiration: number) {
    redisClient.set(key, value, {expiration: {type: "EX", value: expiration}})
}

export async function getFromCache(key: string) {
    return redisClient.get(key)
}


export async function deleteFromCache(key: string) {
    return redisClient.del(key)
}