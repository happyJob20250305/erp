// 급여 항목에 대한 타입 정의
export interface ISalaryListDetail {
    salaryId: number; // 급여 ID
    employeeId: number; // 사원 ID
    salary: number; // 연봉
    baseSalary: number; // 기본급
    nationalPension: number; // 국민연금
    healthInsurance: number; // 건강보험료
    industrialAccident: number; // 산재보험
    employmentInsurance: number; // 고용보험
    additionalAmount: number | null; // 비고금액 (null 가능)
    totalSalary: number; // 실급여
    severancePay: number; // 퇴직금
    paymentStatus: number; // 급여 지급 상태 (1: 지급됨, 0: 미지급 등)
    paymentDate: string; // 급여 지급일
    employeeNumber: number; // 사원 번호
    employeeName: string; // 사원명
    departmentDetailName: string | null; // 부서명 (null 가능)
    jobGradeDetailName: string; // 직급명
    loginId: string | null; // 로그인 ID (null 가능)
    workingYear: number; // 근무 연차
}

// 급여 목록을 담은 배열과 급여 항목 수를 포함한 타입 정의
export interface ISalaryListDetailResponse {
    salaryList: ISalaryListDetail[]; // 급여 목록 배열
    salaryCnt: number; // 급여 항목 수
}
