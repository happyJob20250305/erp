export interface ISalaryClass {
    detailName: string | null;
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
}

export interface IDepartmentGroup {
    departmentCode: string;
    departmentDetailName: string;
    jobGradeCode: string | null;
    jobGradeDetailName: string | null;
    jobRoleCode: string | null;
    jobRoleDetailName: string | null;
}

export interface IJobGradeGroup {
    departmentCode: string | null;
    departmentDetailName: string | null;
    jobGradeCode: string | null;
    jobGradeDetailName: string | null;
    jobRoleCode: string | null;
    jobRoleDetailName: string | null;
}

export interface IEmployeeDetail {
    employeeId: number;
    userType: string | null;
    salaryClassId: number;
    loginId: string | null;
    password: string | null;
    departmentCode: string;
    jobGradeCode: string;
    number: number;
    employeeName: string;
    registrationNumber: string;
    sex: string;
    birthday: string;
    regDate: string;
    email: string;
    address: string;
    finalEducation: string;
    addressDetail: string;
    hp: string;
    bank: string;
    bankAccount: string;
    emplStatus: string;
    resignationDate: string;
    resignationReason: string | null;
    profileFileName: string;
    profilePhysicalPath: string;
    profileLogicalPath: string;
    profileFileSize: number;
    profileFileExt: string;
    jobRoleDetailName: string;
    workingYear: number;
    zipCode: string;
    severancePay: string;
    empMemo: string;
    departmentDetailName: string;
    jobGradeDetailName: string;
}

export interface IEmployeeDetailResponse {
    salaryClassList: ISalaryClass;
    departmentGroupList: IDepartmentGroup[];
    jobRoleGroupList: any[]; // 비어있는 배열이므로 추후 필요시 상세 타입 정의
    detail: IEmployeeDetail;
    jobGradeGroupList: IJobGradeGroup[];
}
