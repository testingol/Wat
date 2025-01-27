import { Ctx, monospace } from "@mengkodingan/ckptw";
import { hastebin } from "../../lib/hastebin";
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
        if (!config.botOwnerID.includes(ctx.sender.decodedJid?.replace("@s.whatsapp.net", "")!)) return;
        
        try {
            const members = await ctx.group().members();
            ctx.sendMessage(ctx.id!, { text: ctx.args.join(" ") || ".", mentions: members.map(m => m.id) })
        } catch (err) {
            console.log("[HIDETAG ERR]", err)
        }
    }
}