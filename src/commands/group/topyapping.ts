import { bold, Cooldown, Ctx, italic } from "@mengkodingan/ckptw";
import bot from "../../client";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "topyapping",
    aliases: ['yapping'],
    description: "Orang paling logika di grup ini.",
    cooldown: 1,
    category: "grup",
    code: async(ctx: Ctx) => {
        if(module.exports.cooldown && makeCooldown(ctx, module.exports.cooldown)) return;
        
        try {
            if(!ctx.isGroup()) return ctx.reply(generateMessage('onlyGroup', { ctx }));

            const groupMembers = await ctx.group().members();
            let isSenderAdmin = groupMembers.filter((x) => x.id === ctx.sender.decodedJid && (x.admin === 'admin' || x.admin === 'superadmin'));

            if (!isSenderAdmin.length) return ctx.reply(generateMessage('onlyAdmin', { ctx }));

            let members = await bot.db.get(`groups.${ctx.decodedId?.replace("@g.us", "")}`);
            members = members.filter((x: { id: string }) => ctx.decodeJid(x.id) !== ctx.decodeJid(ctx._client.user?.id!));
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
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[TOPYAPPING ERR]", err)
        }
    }
}