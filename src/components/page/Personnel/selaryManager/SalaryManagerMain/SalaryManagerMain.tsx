import { useEffect, useState } from "react";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useLocation } from "react-router-dom";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { ISalaryListDetail } from "../../../../../models/interface/personnel/salary/IsalaryMain";
import { ISalaryListDetailResponse } from "../../../../../models/interface/personnel/salary/ISalaryManager";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { SalaryManager } from "../../../../../api/api";

interface SalaryManagerDetailProps {
    Pdata: (data: number) => void;
}

// 급여 관리 페이지
export const SalaryManagerMain = ({ Pdata }: SalaryManagerDetailProps) => {
    const { search } = useLocation();
    const [salaryList, setSalaryList] = useState<ISalaryListDetail[]>();
    const [salaryCnt, setSalaryCnt] = useState<number>();
    const [cPage, setCPage] = useState<number>(1); // 현재 페이지를 초기화

    useEffect(() => {
        salaryManagerList(cPage); // 첫 로딩 시 페이지 1로 데이터 로드
    }, [cPage]);

    const handlerSearch = (employeeNumber: number) => {
        Pdata(employeeNumber);
    };

    const salaryManagerList = async (currentPage: number = 1) => {
        const searchParam = new URLSearchParams(search);
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        const result = await searchApi<ISalaryListDetailResponse>(SalaryManager.salaryList, searchParam);

        if (result) {
            setSalaryList(result.salaryList);
            setSalaryCnt(result.salaryCnt);
            setCPage(currentPage);
        }
    };

    return (
        <>
            <div>총 개수 : {salaryCnt}</div>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>번호</StyledTh>
                        <StyledTh>사원명</StyledTh>
                        <StyledTh>직급</StyledTh>
                        <StyledTh>부서명</StyledTh>
                        <StyledTh>사번</StyledTh>
                        <StyledTh>연봉</StyledTh>
                        <StyledTh>기본급</StyledTh>
                        <StyledTh>국민연금</StyledTh>
                        <StyledTh>건강보험료</StyledTh>
                        <StyledTh>산재보험</StyledTh>
                        <StyledTh>고용보험</StyledTh>
                        <StyledTh>비고금액</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {salaryList && salaryList.length > 0 ? (
                        salaryList.map((salary) => (
                            //  이곳을 클릭 했을 때 employeeNumber를 넘기는 것
                            // 클릭 했을 때 Pdata가 실행 되도록 함
                            <tr key={salary.salaryId} onClick={() => handlerSearch(salary.employeeNumber)}>
                                <StyledTd>{salary.salaryId}</StyledTd>
                                <StyledTd>{salary.employeeName}</StyledTd>
                                <StyledTd>{salary.jobGradeDetailName}</StyledTd>
                                <StyledTd>{salary.departmentDetailName || "없음"}</StyledTd>
                                <StyledTd>{salary.employeeNumber}</StyledTd>
                                <StyledTd>{salary.salary.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.baseSalary.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.nationalPension.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.healthInsurance.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.industrialAccident.toLocaleString()}</StyledTd>
                                <StyledTd>{salary.employmentInsurance.toLocaleString()}</StyledTd>
                                <StyledTd>
                                    {salary.additionalAmount ? salary.additionalAmount.toLocaleString() : "없음"}
                                </StyledTd>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <StyledTd colSpan={12}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

            <PageNavigate
                totalItemsCount={salaryCnt}
                onChange={salaryManagerList}
                activePage={cPage}
                itemsCountPerPage={5}
            />
        </>
    );
};
