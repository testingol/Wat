import axios from "axios";
import dotenv from "dotenv";
import config from "../../config";
dotenv.config();

export async function hastebin(text: string) {
    const result = await axios(config.hasteServer + '/documents', {
        method: 'POST',
        data: text
    });

    return `${config.hasteServer}/${result.data.key}`;
}
