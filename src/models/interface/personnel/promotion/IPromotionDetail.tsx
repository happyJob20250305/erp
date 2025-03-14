// 승진 상세 내역 타입 정의
export interface IPromotionDetail {
    employeeNumber: number; // 사번
    employeeName: string; // 직원 이름
    departmentCode: string; // 부서 코드
    jobGrade: string; // 현재 직급
    createdAt: string; // 생성 일자
    departmentDetailName: string; // 부서 상세 이름
    employeeId: number; // 직원 ID
    recentJobGrade: string | null; // 최근 직급 (nullable)
    newJobGrade: string | null; // 새 직급 (nullable)
}

// 전체 승진 상세 데이터 타입 정의
export interface IPromotionDetailResponse {
    promotionDetailList: IPromotionDetail[]; // 승진 상세 리스트
    promotionDetailCnt: number; // 승진 상세 건수
}

export interface PromotionMainProps {
    data: number;
}
