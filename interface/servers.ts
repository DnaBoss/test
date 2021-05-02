export class ServersConfig {
    local: ServersInfo
}
export class ServersInfo {
    constructor(para: ServersInfo) {
        this.connector = para.connector;
        this.gameServer = para.gameServer;
    }
    connector: Array<ServerConfig>;
    gameServer: Array<ServerConfig>
}
export class ServerConfig {
    publicip: string;
    privateip: string;
    name: string;
    port: string;
    id: number;
    serverType: string;
}

