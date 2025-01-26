import { bold, Cooldown, Ctx } from "@mengkodingan/ckptw";
import axios from "axios";

module.exports = {
    name: "tiktokdl",
    description: "Tiktok downloader.",
    cooldown: 5,
    category: "downloader",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 5000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            if(!ctx.args.length) return ctx.react(ctx.id!, '❌');
            let url = ctx.args[0];

            let { data } = await axios('https://api.tiklydown.eu.org/api/download?url=' + url);

            if(!data.images && !data.video) return ctx.react(ctx.id!, '❌');

            let caption = `${data.title}
                    
👍 ${bold(data.stats.likeCount + " Likes")}
🔁 ${bold(data.stats.shareCount + " Shares")}
💬 ${bold(data.stats.commentCount + " Comments")}
🔄️ ${bold(data.stats.playCount + " Views")}
🔖 ${bold(data.stats.saveCount + " Saves")}`;
            
            if(data.video) {
                let { data: cover } = await axios(data.video.origin_cover, {
                    responseType: 'arraybuffer'
                });

                ctx.reply({ video: { url: data.video.noWatermark }, caption, jpegThumbnail: cover });
            } else if(data.images) {
                await Promise.all(data.images.map(async (img: { url: string }) => {
                    await ctx.sendMessage(ctx.id!, { image: { url: img.url }, jpegThumbnail: '' });
                }));

                ctx.reply({ text: caption });
            }
        } catch (err) {
            ctx.react(ctx.id!, '❌');
            console.log("[TIKTOKDL ERR]", err)
        }
    }
}