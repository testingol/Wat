import { Cooldown, Ctx } from "@mengkodingan/ckptw";
import axios from "axios";

module.exports = {
    name: "ytmp4",
    description: "Youtube to MP4.",
    cooldown: 5,
    category: "downloader",
    hidden: true,
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 5000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            if(!ctx.args.length) return ctx.react(ctx.id!, '❌');
            let url = ctx.args[0];

            let { data } = await axios('https://ytdl.axeel.my.id/api/download/video?url=' + url);
            ctx.reply({ video: { url: data.downloads.url } });
        } catch (err) {
            ctx.react(ctx.id!, '❌');
            console.log("[TIKTOKDL ERR]", err)
        }
    }
}