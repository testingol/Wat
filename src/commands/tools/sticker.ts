import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";
import { upload } from "../../lib/upload";
import filetype from 'file-type'

module.exports = {
    name: "sticker",
    aliases: ['s', 'stiker'],
    description: "Convert gambar atau gif/mp4 ke sticker.",
    cooldown: 1,
    category: "tools",
    args: ["<argument?>"],
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            let buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
            if(!buffer) return ctx.react(ctx.id as string, "❌");
        
            let bufferType = await filetype.fromBuffer(buffer as any);

            if(ctx.args.length && bufferType?.ext !== 'mp4') {
                let uploaded = await upload(buffer);
                let cap = ctx.args.join(" ").split("|");

                
                if(cap.length === 1) {
                    cap.push("_");
                    cap.reverse();
                }
                
                buffer = `https://api.memegen.link/images/custom/${cap[0]}/${cap[1]}.png?background=${uploaded}?font=impact` as any
            }
            
            const sticker = new Sticker(buffer as any, {
                pack: config.sticker.pack,
                author: config.sticker.author,
                type: StickerTypes.FULL,
                categories: [],
                id: ctx.id!,
                quality: 50,
            });

            return ctx.reply(await sticker.toMessage());
        } catch (err) {
            console.log("[STICKER ERR]", err)
        }
    }
}