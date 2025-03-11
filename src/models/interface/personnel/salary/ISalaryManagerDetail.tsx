// salaryDetail 배열의 각 원소 형태
export interface ISalaryDetail {
    salaryId: number;
    employeeId: number;
    salary: number; // 연봉
    baseSalary: number; // 기본급
    nationalPension: number; // 국민연금
    healthInsurance: number; // 건강보험료
    industrialAccident: number; // 산재보험
    employmentInsurance: number; // 고용보험
    additionalAmount: number | null; // 비고금액
    totalSalary: number; // 실급여
    severancePay: number; // 퇴직금
    paymentStatus: number;
    paymentDate: string; // YYYY-MM-DD 등 날짜 형식
    employeeNumber: number;
    employeeName: string;
    departmentDetailName: string | null; // 예) "영업부", 없으면 null
    jobGradeDetailName: string | null; // 예) "부장", 없으면 null
    loginId: string | null; // null 가능
    workingYear: number; // 근속연수 (예: 0)
}

// 전체 응답 구조
export interface ISalaryDetailResponse {
    salaryDetailCnt: number; // salaryDetail 배열 개수
    salaryDetail: ISalaryDetail[]; // salaryDetail 배열
}

export interface SalaryManagerDetailProps {
    data: number;
}
