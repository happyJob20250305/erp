// 승진 내역 타입 정의
export interface IPromotionList {
    employeeNumber: number; // 사번
    employeeName: string; // 직원 이름
    departmentCode: string; // 부서 코드
    jobGrade: string; // 현재 직급
    createdAt: string; // 생성 일자
    departmentDetailName: string; // 부서 상세 이름
    employeeId: number; // 직원 ID
    recentJobGrade: string | null; // 최근 직급 (nullable)
    newJobGrade: string; // 새 직급
}

// 전체 승진 데이터 타입 정의
export interface IPromotionListResponse {
    promotionCnt: number; // 전체 승진 수
    promotionList: IPromotionList[]; // 승진 리스트
}
