export interface ISalaryListDetail {
    salaryId: number;
    employeeId: number;
    salary: number; //연봉
    baseSalary: number; //기본급
    nationalPension: number; //국민연금
    healthInsurance: number; //건강보험료
    industrialAccident: number; //산재보험
    employmentInsurance: number; //고용보험
    additionalAmount: number | null; // 비고금액
    totalSalary: number; //실급여
    severancePay: number;
    paymentStatus: number;
    paymentDate: string; // 날짜는 보통 string
    employeeNumber: number;
    employeeName: string;
    departmentDetailName: string | null; // null 가능
    jobGradeDetailName: string;
    loginId: string | null; // null 가능
    workingYear: number;
}

export interface ISalaryListDetailBodyResponse {
    salaryListDetail: ISalaryListDetail;
}

export interface SararyMainProps {
    data: string;
}
