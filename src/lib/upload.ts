import axios from "axios";
import dotenv from "dotenv";
import FileType from 'file-type';
import config from "../../config";
import FormData from "form-data";
dotenv.config();

export async function upload(buffer: any) {
    let file = await FileType.fromBuffer(buffer);

    let form = new FormData();
    form.append('files[]', buffer, `tmp${Date.now()}.${file?.ext}`);

    const result = await axios.post('https://uguu.se/upload', form, {
        headers: {
          ...form.getHeaders(),
        },
    });

    return result.data.files[0].url;
}
