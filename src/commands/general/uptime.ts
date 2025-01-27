import { bold, Cooldown, Ctx } from "@mengkodingan/ckptw";
import { mshumanize } from "../../lib/util";
import os from 'os';

module.exports = {
    name: "uptime",
    description: "Mendapatkan uptime bot!",
    cooldown: 1,
    category: "general",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            ctx.reply(`${bold('🤖 | Bot Uptime:')} ${mshumanize(Date.now() - ctx._self.readyAt!)}\n${bold('⌛ | Process Uptime:')} ${mshumanize(require("process").uptime() * 1000)}\n${bold('💻 | OS Uptime:')} ${mshumanize(os.uptime() * 1000)}`);
        } catch (err) {
            console.log("[UPTIME ERR]", err)
        }
    }
}