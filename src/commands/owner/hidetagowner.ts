import { Ctx } from "@mengkodingan/ckptw";
import dotenv from "dotenv";
import config from "../../../config";
import generateMessage from "../../lib/generateMessage";
dotenv.config();

module.exports = {
    name: "hidetagowner",
    description: "🤔",
    aliases: ['htgowner'],
    cooldown: 0,
    category: "owner",
    code: async(ctx: Ctx) => {        
        try {
            if (!config.botOwnerID.includes(ctx.sender.decodedJid?.replace("@s.whatsapp.net", "")!)) return ctx.reply(generateMessage('onlyOwner', { ctx }));
            const members = await ctx.group().members();
            
            ctx.sendMessage(ctx.id!, { text: ctx.args.join(" ") || String.fromCharCode(8206).repeat(4001), mentions: members.map(m => m.id) })
        } catch (err) {
            console.log("[HIDETAG ERR]", err)
        }
    }
}