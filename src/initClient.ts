import dotenv from 'dotenv';
dotenv.config();

import { Client } from "@mengkodingan/ckptw";
import axios from 'axios';
import FileType from 'file-type';
import fs from 'fs';

interface ExtendedClient extends Client {
    sendFile: (jid: any, path: any, fileName: string | undefined, caption: string | undefined, quoted: any, options?: {}) => Promise<any>;
    getBuffer: (url: any, options: any) => Promise<any>;
    getFile: (path: string | Buffer) => Promise<{ res: any, mime: string, ext: string, data: Buffer }>;
}

const bot = new Client({
    prefix: /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/,
    printQRInTerminal: false,
    readIncommingMsg: true,
    usePairingCode: true,
    selfReply: true,
    phoneNumber: process.env.BOT_PHONE_NUMBER,
}) as ExtendedClient;

bot.getFile = async (path) => {
    let res
    let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split(`,`)[1], 'base64') : /^https?:\/\//.test(path) ? (res = await axios.get(path, { responseType: 'arraybuffer' })).data : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
    if (!Buffer.isBuffer(data)) throw 'Result is not a buffer'
    let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' }
    return { res, ...type, data }
}

bot.getBuffer = async (url, options) => {
    try {
        options ? options : {};
        const res = await axios({
            method: "get",
            url,
            headers: {
                DNT: 1,
                "Upgrade-Insecure-Request": 1,
            },
            ...options,
            responseType: "arraybuffer",
        });
        return res.data;
    } catch (e) {
        console.log(`Error : ${e}`);
    }
};

bot.sendFile = async (jid, path, fileName = '', caption = '', quoted, options: { asDocument?: boolean; mimetype?: string } = {}) => {
    let type = await bot.getFile(path)
    let { res, data } = type
    if (res && res.status !== 200 || data.length <= 65536) {
        try { throw { json: JSON.parse(data.toString()) } }
        catch (e: any) { if (e.json) throw e.json }
    }
    let opt: { fileName: string; quoted?: any } = { fileName }
    if (quoted) opt.quoted = quoted
    let mtype = '', mimetype = options.mimetype || type.mime
    if (!type || options.asDocument) mtype = 'document'
    else if (/webp/.test(type.mime)) mtype = 'sticker'
    else if (/image/.test(type.mime)) mtype = 'image'
    else if (/video/.test(type.mime)) mtype = 'video'
    else if (/audio/.test(type.mime)) mtype = 'audio'
    else mtype = 'document'
    return await bot.core.sendMessage(jid, { ...opt, ...options, [mtype]: data, mimetype, caption } as any, { ...opt, ...options })
}

export default bot;