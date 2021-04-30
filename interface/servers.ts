export interface ServersConfig {
    local: Servers
}
interface Servers {
    connector: Array<ServerConfig>;
    holdem: Array<ServerConfig>
}
export interface ServerConfig {
    publicip: string;
    privateip: string;
    name: string;
    port: string;
    id: number
}

