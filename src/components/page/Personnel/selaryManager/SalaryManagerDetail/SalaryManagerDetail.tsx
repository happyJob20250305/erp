import { useEffect, useState } from "react";
import {
    ISalaryDetail,
    ISalaryDetailResponse,
    SalaryManagerDetailProps,
} from "../../../../../models/interface/personnel/salary/ISalaryManagerDetail";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { SalaryManager } from "../../../../../api/api";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

export const SalaryManagerDetail = ({ data }: SalaryManagerDetailProps) => {
    // data는 props로부터 전달받은 employeeNumber라고 가정

    const [salaryDetail, setSalaryDetail] = useState<ISalaryDetail[]>([]);
    const [employeeNumber, setEmployeeNumber] = useState<number>();

    useEffect(() => {
        // 컴포넌트 마운트 시 또는 data(=employeeNumber)가 바뀔 때 조회
        salaryManagerDetailList(data);
    }, [data]);

    // 사원의 급여 리스트 조회
    const salaryManagerDetailList = async (data: number) => {
        try {
            const searchParam = new URLSearchParams();
            searchParam.append("currentPage", "1");
            searchParam.append("pageSize", "5");

            // 숫자를 쿼리스트링으로 보낼 때는 String() 등으로 변환 필요
            searchParam.append("employeeNumber", String(data));

            // API 호출
            const result = await searchApi<ISalaryDetailResponse>(SalaryManager.empnoSalaryList, searchParam);

            if (result) {
                // result.salaryDetail을 State에 저장
                setSalaryDetail(result.salaryDetail);
                console.log(result.salaryDetail);
            }
        } catch (error) {
            console.error("급여 리스트 조회 실패:", error);
        }
    };

    return (
        <div>
            <h2>급여 상세</h2>

            {salaryDetail && salaryDetail.length > 0 ? (
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>사번</StyledTh>
                            <StyledTh>사원명</StyledTh>
                            <StyledTh>연봉</StyledTh>
                            <StyledTh>기본급</StyledTh>
                            <StyledTh>국민연금</StyledTh>
                            <StyledTh>건강보험</StyledTh>
                            <StyledTh>산재보험</StyledTh>
                            <StyledTh>고용보험</StyledTh>
                            <StyledTh>비고금액</StyledTh>
                            <StyledTh>실급여</StyledTh>
                            <StyledTh>지급일</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {salaryDetail.map((salary) => (
                            <tr key={salary.salaryId}>
                                <StyledTd>{salary.employeeNumber}</StyledTd>
                                <StyledTd>{salary.employeeName}</StyledTd>
                                <StyledTd>{salary.salary.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.baseSalary.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.nationalPension.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.healthInsurance.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.industrialAccident.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.employmentInsurance.toLocaleString()}</StyledTd>
                                <StyledTd>
                                    {salary.additionalAmount ? salary.additionalAmount.toLocaleString() : "없음"}
                                </StyledTd>
                                <StyledTd>{salary.totalSalary.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.paymentDate}</StyledTd>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            ) : (
                <p>조회된 급여 정보가 없습니다.</p>
            )}
        </div>
    );
};
