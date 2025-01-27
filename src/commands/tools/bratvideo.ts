import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";

module.exports = {
    name: "bratvideo",
    aliases: ['bratvid', 'sbratvid', 'stickerbratvid', 'stickerbratvid'],
    description: "Buat sticker video brat.",
    cooldown: 4,
    category: "tools",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 4000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            if(!ctx.args.length) return ctx.react(ctx.id as string, "❌");
            if(ctx.args.length > 5000) return ctx.reply("❌ max 5000 karakter bang.")

            const sticker = new Sticker(`https://brat.caliphdev.com/api/brat/animate?text=${encodeURIComponent(ctx.args.join(' '))}`, {
                pack: config.sticker.pack,
                author: config.sticker.author,
                type: StickerTypes.FULL,
                categories: [],
                id: ctx.id!,
                quality: 50,
            });

            return ctx.reply(await sticker.toMessage());
        } catch (err) {
            console.log("[BRAT ERR]", err)
        }
    }
}