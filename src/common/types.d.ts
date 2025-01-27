import { Client } from "@mengkodingan/ckptw";

export interface Config {
    client: Client;
    commandHandlerLog: boolean;
    botOwnerID: Array<string>;
    hasteServer: string;
}

interface ExtendedClient extends Client {
    sendFile: (jid: any, path: any, fileName: string | undefined, caption: string | undefined, quoted: any, options?: {}) => Promise<any>;
    getFile: (path: string | Buffer) => Promise<{ res: any, mime: string, ext: string, data: Buffer }>;
}