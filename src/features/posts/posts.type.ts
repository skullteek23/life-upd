export interface IPost {
    added_by: number,
    img_url: string,
    caption: string,
    created_at: number,
    category: Category,
    id: number
}
export interface IQuery {
    text: string;
    values: any[];
}
export enum Category {
    rsh = 'rsh',
    mny = 'mny',
    hlt = 'hlt',
    wrk = 'wrk',
    slf = 'slf',
    lex = 'lex'
} 