import { bold, Ctx, inlineCode, italic } from "@mengkodingan/ckptw";
import ms from "ms";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

interface CommandDetail {
    name: string;
    aliases?: Array<string>;
    description?: string;
    cooldown?: number;
    category?: string;
    args?: Array<string>;
    hidden?: boolean;
}

module.exports = {
    name: "help",
    description: "Bot command list or help menu.",
    aliases: ['menu'],
    cooldown: 1,
    category: "general",
    args: ["<command?>"],
    code: async(ctx: Ctx) => {
        if(module.exports.cooldown && makeCooldown(ctx, module.exports.cooldown)) return;

        try {
            let allCommandsValue = Array.from(ctx._self.cmd?.values() as unknown as ArrayLike<unknown>) as Array<CommandDetail>;
            if(ctx.args.length) {
                let commandDetail = allCommandsValue.filter(
                    (c: any) =>
                        c.name.toLowerCase() === ctx.args[0].toLowerCase() ||
                        (c.aliases && typeof c.aliases === "object"
                            ? c.aliases.includes(ctx.args[0].toLowerCase())
                            : c.aliases === ctx.args[0].toLowerCase())
                ) as Array<CommandDetail>;

                if(!commandDetail.length) return ctx.react(ctx.id!, '❌');

                commandDetail.map((x) => {
                    
                    ctx.reply(`${bold(italic(x.name))}

${x.description || "none"}

⤷ Aliases: ${inlineCode(x.aliases? x.aliases.join('`, `') : 'none')}
⤷ Cooldown: ${inlineCode(ms(Number(x.cooldown || 0) * 1000))}
⤷ Category: ${inlineCode(x.category || "none")}
⤷ Usage: ${inlineCode((ctx._used.prefix + x.name + ' ' + (x.args? x.args.join(' ') : '')).trim())}`);

                })
            } else {
                let cmds: { [key: string]: any } = {};
                let text = `Halo ${ctx.sender.pushName} 👋`;
                
                allCommandsValue.map((x) => {
                    let categoryCapitalized = x.category ? x.category.charAt(0).toUpperCase() + x.category.slice(1) : 'Tidak Ada Category';
                    if(!cmds[categoryCapitalized]) {
                        cmds[categoryCapitalized] = [x.name];
                    } else {
                        if(x.hidden) return;
                        cmds[categoryCapitalized].push(x.name);
                    }
                });

                let emoji = {
                    "General": "🔎",
                    "Tools": "✂",
                    "Owner": "🤖",
                    "Downloader": "📥",
                    "Minigames": "🎮",
                    "Grup": "👥",
                    "Tidak Ada Category": "❓"
                }

                Object.keys(cmds).map((x) => {
                    text += `\n\n${bold(emoji[x as keyof typeof emoji] + " " + x)}\n${inlineCode(cmds[x].join('`, `'))}`
                });

                ctx.reply(text);
            }
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[HELP ERR]", err)
        }
    }
}