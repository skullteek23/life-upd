export interface IPost {
    added_by: number,
    img_url: string,
    caption: string,
    created_at: number,
    category: Category,
    is_pvt: number,
    id: number
}
export enum Category {
    rsh = 'rsh',
    mny = 'mny',
    hlt = 'hlt',
    wrk = 'wrk',
    slf = 'slf',
    lex = 'lex'
}

export type ImageFile = Express.Multer.File;

export const ERROR_CODES = {
    imageProcessingError: 'Image processing error',
    compressionAborted: 'COMPRESSION ABORTED'
}
