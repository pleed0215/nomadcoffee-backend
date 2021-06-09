export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: Function;
}
export interface RemoveResult {
    ok: boolean;
    error?: string;
}
export interface UploadResult extends RemoveResult {
    url?: string;
}
export declare const uploadFile: (file: FileUpload) => Promise<UploadResult>;
/**
 * 제공된 url 파일을 제거. url을 분석하여 s3 버킷 파일을 제거한다.
 * @param {string} url 제거할 url
 * @returns {RemoveResult} 잘 제거 되면 ok: true, 아니면 ok: false + 에러메시지.
 */
export declare const removeFile: (url: string) => Promise<{
    ok: boolean;
    error?: undefined;
} | {
    ok: boolean;
    error: any;
}>;
