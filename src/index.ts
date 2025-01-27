import { Events, CommandHandler } from "@mengkodingan/ckptw";
import path from "path";
import bot from "./client";
import config from "../config";

bot.ev.once(Events.ClientReady, (m) => {
    bot.consolefy?.success("Client Ready At", m.user.id);
});

const cmd = new CommandHandler(bot, path.resolve('dist', 'src') + '/commands');
cmd.load(config.commandHandlerLog);

bot.launch();