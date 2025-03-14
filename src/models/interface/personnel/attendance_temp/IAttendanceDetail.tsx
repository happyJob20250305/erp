import { IAttendance } from "./IAttendance";

export interface IAttendanceDetail extends IAttendance {
    reqReason: string,
    deptName: string | null,
    reqTel: string,
    reqdate: string,
}
