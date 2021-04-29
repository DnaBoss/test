import { TritonNode } from "./tritonNode";
import { RedisDao } from "./redisDao";

export class Server {
    receiver: TritonNode;
    // sender: Sender;
    redisDao: RedisDao;
    constructor() { }
}