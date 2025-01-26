import { Events, CommandHandler } from "@mengkodingan/ckptw";
import path from "path";
import bot from "./initClient";

bot.ev.once(Events.ClientReady, (m) => {
    bot.consolefy?.success("Client Ready At", m.user.id);
});

const cmd = new CommandHandler(bot, path.resolve('dist') + '/commands');
cmd.load();

bot.launch();