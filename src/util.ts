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