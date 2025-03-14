export interface IJobRoleGroupResponse {
    jobRoleGroupList: IJobRoleGroup[];
}

export interface IJobRoleGroup {
    departmentCode: string | null;
    departmentDetailName: string | null;
    jobGradeCode: string | null;
    jobGradeDetailName: string | null;
    jobRoleCode: string;
    jobRoleDetailName: string;
}
