import { Cooldown, Ctx, italic, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";

module.exports = {
    name: "quotly",
    description: "Buat sticker quotly.",
    cooldown: 4,
    category: "tools",
    args: ["<username>|<argument>"],
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 4000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            if(!ctx.args.length) return ctx.react(ctx.id as string, "❌");
            let [username, message] = ctx.args.join(' ').split("|");

            if(!username || !message) return ctx.reply(italic(`❌ Contoh penggunaan: ${ctx._used.prefix}${ctx._used.command} username|lucu`))

            const sticker = new Sticker(`https://fastrestapis.fasturl.cloud/maker/quotly?name=${encodeURIComponent(username)}&text=${encodeURIComponent(message)}&bgColor=%23FFFFFF`, {
                pack: config.sticker.pack,
                author: config.sticker.author,
                type: StickerTypes.FULL,
                categories: [],
                id: ctx.id!,
                quality: 50,
            });

            return ctx.reply(await sticker.toMessage());
        } catch (err) {
            console.log("[QUOTLY ERR]", err)
        }
    }
}