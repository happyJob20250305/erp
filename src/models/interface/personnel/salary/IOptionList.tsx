// "DepartmentGroupList"의 각 아이템
export interface IDepartmentGroupItem {
    departmentCode: string; // 예: "DP"
    departmentDetailName: string; // 예: "회계부"
    jobGradeCode: string | null; // null
    jobGradeDetailName: string | null;
    jobRoleCode: string | null;
    jobRoleDetailName: string | null;
}

// "JobGradeGroupList"의 각 아이템
export interface IJobGradeGroupItem {
    departmentCode: string | null; // null
    departmentDetailName: string | null;
    jobGradeCode: string; // 예: "JG"
    jobGradeDetailName: string; // 예: "대리"
    jobRoleCode: string | null;
    jobRoleDetailName: string | null;
}

// 전체 응답의 구조
export interface IGroupListResponse {
    DepartmentGroupList: IDepartmentGroupItem[];
    JobGradeGroupList: IJobGradeGroupItem[];
}
