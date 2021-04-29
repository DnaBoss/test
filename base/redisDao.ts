import { RedisClient } from 'redis';
export class RedisDao {
    pub: RedisClient;
    sub: RedisClient;
    client: RedisClient;
    constructor(pub: RedisClient, sub: RedisClient, client: RedisClient) {
        this.pub = pub;
        this.sub = sub;
        this.client = client;
    }
}