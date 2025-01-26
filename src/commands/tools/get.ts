import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import axios from "axios";

module.exports = {
    name: "get",
    aliases: ['fetch'],
    description: "Send a get request to the requested url.",
    cooldown: 1,
    category: "tools",
    code: async(ctx: any) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            if(!ctx.args.length) return ctx.react(ctx.id as string, "❌");

            let { href } = new URL(ctx.args[0])
            let res = await axios.get(href);
            if (!/text|json/.test(res.headers['content-type'])) {
                return ctx._self.sendFile(ctx.id, href, '', href, ctx.msg);
            } else {
                if (res.headers['content-type'].includes('json')) {
                    return ctx.reply(JSON.stringify(res.data, null, 2));
                } else {
                    return ctx.reply(res.data);
                }
            }
        } catch (err) {
            console.log("[GET ERR]", err)
        }
    }
}