import { bold, Cooldown, Ctx, italic } from "@mengkodingan/ckptw";
import bot from "../../client";

module.exports = {
    name: "topyapping",
    aliases: ['yapping'],
    description: "Orang paling logika di grup ini.",
    cooldown: 1,
    category: "grup",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');
        
        try {
            if(!ctx.isGroup()) return ctx.react(ctx.id!, '❌');

            let members = await bot.db.get(`groups.${ctx.decodedId?.replace("@g.us", "")}`);
            members = members.sort((a: any, b: any) => b.sent - a.sent);

            let group = await ctx.group().metadata();
            let text = `${italic(bold(`TOP YAPPING ALL TIME ${group.subject}`))}\n\n`;

            members.map((x: { id: string, sent: number }, idx: number) => {
                let mention = ctx.decodeJid(x.id).replace("@s.whatsapp.net", "");
                if (idx === 0) {
                    text += `🥇 @${mention} - ${x.sent} pesan\n`;
                } else if (idx === 1) {
                    text += `🥈 @${mention} - ${x.sent} pesan\n`;
                } else if (idx === 2) {
                    text += `🥉 @${mention} - ${x.sent} pesan\n`;
                } else {
                    text += `${idx + 1}. @${mention} - ${x.sent} pesan\n`;
                }
            });

            ctx.reply(text)
        } catch (err) {
            console.log("[TOPYAPPING ERR]", err)
        }
    }
}