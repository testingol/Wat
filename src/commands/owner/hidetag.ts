import { Ctx } from "@mengkodingan/ckptw";
import dotenv from "dotenv";
import config from "../../../config";
dotenv.config();

module.exports = {
    name: "hidetag",
    description: "🤔",
    aliases: ['htg'],
    cooldown: 0,
    category: "owner",
    code: async(ctx: Ctx) => {        
        try {
            const members = await ctx.group().members();

            let isSenderAdmin = members.filter((x) => x.id === ctx.sender.decodedJid && x.admin === 'admin');
            if (!isSenderAdmin.length && !config.botOwnerID.includes(ctx.sender.decodedJid?.replace("@s.whatsapp.net", "")!)) return;
            
            ctx.sendMessage(ctx.id!, { text: ctx.args.join(" ") || String.fromCharCode(8206).repeat(4001), mentions: members.map(m => m.id) })
        } catch (err) {
            console.log("[HIDETAG ERR]", err)
        }
    }
}