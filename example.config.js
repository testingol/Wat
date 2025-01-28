require('dotenv').config();

/** @type {import('./src/common/types').Config} */
module.exports = {
    client: {
        prefix: /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/,
        printQRInTerminal: false,
        readIncommingMsg: true,
        usePairingCode: true,
        selfReply: true,
        phoneNumber: process.env.BOT_PHONE_NUMBER,
        autoMention: true
    },
    commandHandlerLog: true,
    botOwnerID: process.env.BOT_OWNER_ID?.split(", "),
    hasteServer: process.env.HASTE_SERVER,
    sticker: {
        pack: 'npmjs.com/@mengkodingan/ckptw',
        author: 'github.com/mengkodingan/ckptw'
    }
}