export interface IQuery {
    text: string;
    values: any[];
}

export interface IStatus extends IResponse {
    error: string;
}

export interface IResponse {
    response: any;
}

export interface ImageResizingOpts {
    height: number,
    width: number,

}