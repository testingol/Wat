import { bold, Cooldown, Ctx } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";
import { upload } from "../../lib/upload";
import filetype from 'file-type'
import { messageTypeFromBuffer } from "../../util";
import axios from "axios";

module.exports = {
    name: "whatanime",
    aliases: ['whatanim'],
    description: "Identifikasi anime dari gambar.",
    cooldown: 5,
    category: "tools",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 5000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            let buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
            if(!buffer) return ctx.react(ctx.id as string, "❌");

            let bufferType = await messageTypeFromBuffer(buffer);
            if(bufferType !== 'image') return ctx.react(ctx.id as string, "❌");

            let uploaded = await upload(buffer);
            let { data } = await axios(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(uploaded)}`);

            ctx.reply({ video: { url: data.result[0].video }, caption: `${bold(`${data.result[0].anilist.title.native} (${data.result[0].anilist.title.romaji})`)}

🔗 https://anilist.co/anime/${data.result[0].anilist.id}
🕒 Episode ${data.result[0].episode}, di ${new Date(data.result[0].from * 1000).toISOString().substr(11, 8)}
🤔 ${(data.result[0].similarity * 100).toFixed(1)}% Kemiripan` });
        } catch (err) {
            console.log("[WHATANIME ERR]", err)
        }
    }
}