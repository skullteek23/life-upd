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

export interface PostFilters {
    within: string;
    typeOf: string;
    ofUser: number;
}

export const DB_KEY = {
    username: 'username',
    added_by: 'added_by',
    img_url: 'img_url',
    caption: 'caption',
    created_at: 'created_at',
    category: 'category',
    is_pvt: 'is_pvt',
    id: 'id'
}
