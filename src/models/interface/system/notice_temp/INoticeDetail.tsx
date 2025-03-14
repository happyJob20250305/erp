import { INotice } from "./INotice";

export interface INoticeDetail extends INotice {
    fileName: string | null,
    physicalPath: string | null,
    logicalPath: string | null,
    fileSize: number | null,
    fileExt: string | null
}