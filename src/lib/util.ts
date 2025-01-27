import filetype from 'file-type';

type messageTypeFromBufferResponse = 'image' | 'video' | 'audio' | null;

export async function messageTypeFromBuffer(buffer: any): Promise<messageTypeFromBufferResponse> {
    let bufferType = await filetype.fromBuffer(buffer as any);
    if(!bufferType) return null;

    if(/image/.test(bufferType.mime)) return 'image';
    if(/video/.test(bufferType.mime)) return 'video';
    if(/audio/.test(bufferType.mime)) return 'audio';

    return null;
}

export function mshumanize(ms: number, customization = { separator: ", ", day: " day", hour: " hour", minutes: " minutes", seconds: " seconds" }) {
    const separator = customization.separator || ", ";
    const milliseconds = parseInt(ms as any, 10);
    return Math.floor(milliseconds / (1000 * 60 * 60 * 24))+(customization.day||" day")+separator+Math.floor((milliseconds / (1000 * 60 * 60)) % 24)+(customization.hour||" hour")+separator+Math.floor((milliseconds / (1000 * 60)) % 60)+(customization.minutes||" minutes")+separator+Math.floor((milliseconds / 1000) % 60)+(customization.seconds||" seconds");
}