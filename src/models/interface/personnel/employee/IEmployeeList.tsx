export interface IEmployeeResponse {
    employeeCnt: number;
    employeeList: IEmployee[];
}

export interface IEmployee {
    employeeId: number;
    userType: string | null;
    salaryClassId: number;
    loginId: string | null;
    password: string | null;
    departmentCode: string;
    jobGradeCode: string;
    number: number;
    employeeName: string;
    registrationNumber: string | null;
    sex: string | null;
    birthday: string | null;
    regDate: string;
    email: string | null;
    address: string | null;
    finalEducation: string | null;
    addressDetail: string | null;
    hp: string | null;
    bank: string | null;
    bankAccount: string | null;
    emplStatus: string;
    resignationDate: string | null;
    resignationReason: string | null;
    profileFileName: string | null;
    profilePhysicalPath: string | null;
    profileLogicalPath: string | null;
    profileFileSize: number;
    profileFileExt: string | null;
    jobRoleDetailName: string | null;
    workingYear: number;
    zipCode: string | null;
    severancePay: string | null;
    empMemo: string | null;
    departmentDetailName: string;
    jobGradeDetailName: string;
}
