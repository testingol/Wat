import { bold, Cooldown, Ctx, italic, monospace } from "@mengkodingan/ckptw";
import axios from "axios";

module.exports = {
    name: "ttslontong",
    description: "Minigames Teka Teki Sulit Cak Lontong.",
    cooldown: 5,
    category: "minigames",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 5000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            let { data } = await axios('https://api.dotmydotid.my.id/api/ttslontong');
            let selected = data[Math.floor(Math.random() * data.length)];
            let answer = selected.answer.toLowerCase();

            let hintIndex = answer.indexOf(selected.letter_hint.toLowerCase());
            let clue = answer.split("").map((x: string, idx: number) => idx !== hintIndex ? "_" : x.toUpperCase()).join(" ");

            let botSent = await ctx.reply(`${italic(bold(selected.question.toUpperCase()))}\n\n${monospace(clue)}\n\n${italic(`${answer.length} Huruf, Huruf ke ${hintIndex + 1} adalah ${selected.letter_hint.toUpperCase()}. Jawab dengan mengetikan langsung jawaban. Batas waktu 1 menit.`)}`);
    
            let col = ctx.MessageCollector({ time: 60000 });
            col.on("collect", (m) => {
                if(m.content.toLowerCase() == answer) return col.stop({ reason: 'answered', ...m })
            });

            col.on("end", (collector, reason) => {
                if(reason && reason.reason === "answered") {
                    ctx.sendMessage(ctx.id!, { text: `Hore 😹, @${reason.decodedSender.replace("@s.whatsapp.net", "")} telah menjawab dengan benar!\n\n${italic(`Jawabannya itu ${bold(answer.toUpperCase())}, alesannya ${selected.reason.toUpperCase()}`)}` }, { quoted: reason })
                    return;
                }

                ctx.sendMessage(ctx.id!, { text: `Timeout! Tidak ada yang bisa menjawab dengan benar.\n\n${italic(`Jawabannya itu ${bold(answer.toUpperCase())}, alesannya ${selected.reason.toUpperCase()} 😹`)}` }, { quoted: botSent });
            });
        } catch (err) {
            console.log("[TTSLONTONG ERR]", err)
        }
    }
}