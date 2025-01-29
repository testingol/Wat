import { Cooldown, Ctx } from "@mengkodingan/ckptw";
import generateMessage from "./generateMessage";

export default function makeCooldown(ctx: Ctx, seconds: number) {
    const cooldown = new Cooldown(ctx, seconds * 1000);
    if(cooldown.onCooldown) return ctx.reply(generateMessage('cooldown', { ctx, cooldown }));
}