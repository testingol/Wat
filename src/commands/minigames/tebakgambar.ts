import { bold, Cooldown, Ctx, italic } from "@mengkodingan/ckptw";
import axios from "axios";

module.exports = {
    name: "tebakgambar",
    description: "Minigames tebak gambar.",
    cooldown: 1,
    category: "minigames",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            let { data } = await axios('https://api.dotmydotid.my.id/api/tebakgambar');
            let selected = data[Math.floor(Math.random() * data.length)];

            let cover = await axios(selected.image, {
                responseType: 'arraybuffer'
            });

            let botSent = await ctx.reply({ image: { url: selected.image }, jpegThumbnail: cover.data, caption: `${bold(`Tebak Gambar Level ${selected.level} no ${selected.no}`)}
                
${italic('Jawab tebak gambar ini, dengan mengetikan langsung jawaban. Batas waktu 1 menit.')}`})

            let col = ctx.MessageCollector({ time: 60000 });
            col.on("collect", (m) => {
                if(m.content.toLowerCase() == selected.jawaban.toLowerCase()) return col.stop({ reason: 'answered', ...m })
            });

            col.on("end", (collector, reason) => {
                if(reason && reason.reason === "answered") {
                    ctx.sendMessage(ctx.id!, { text: `Hore 😹, @${reason.decodedSender.replace("@s.whatsapp.net", "")} telah menjawab dengan benar!\n\n${italic(`Jawaban Tebak Gambar level ${selected.level} no ${selected.no}: ${selected.jawaban}`)}` }, { quoted: reason })
                    return;
                }

                ctx.sendMessage(ctx.id!, { text: `Timeout! Tidak ada yang bisa menjawab dengan benar.\n\n${italic(`Jawaban Tebak Gambar level ${selected.level} no ${selected.no}: ${selected.jawaban}`)}` }, { quoted: botSent });
            });
        } catch (err) {
            console.log("[TEBAKGAMBAR ERR]", err)
        }
    }
}