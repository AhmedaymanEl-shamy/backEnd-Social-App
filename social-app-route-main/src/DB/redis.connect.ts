import {createClient} from "redis"
import {REDIS_URL} from "../config";

export const redisClient = createClient({
    url: REDIS_URL
});

export function redisConnect() {
    redisClient.connect().then(() => {
        console.log("Redis Connected");
    }).catch((err: any) => console.log(`Redis Connect failed: ${err}`));
}

