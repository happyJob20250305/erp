import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { MySalaryDetail } from "../../../../../api/api";
import {
    ISalaryListDetail,
    ISalaryListDetailBodyResponse,
    SararyMainProps,
} from "../../../../../models/interface/personnel/salary/IsalaryMain";

// 내 급여조회 페이지
export const SalaryMain = ({ data }: SararyMainProps) => {
    const [salaryListDetail, setSalaryDetailList] = useState<ISalaryListDetail>();

    console.log(data);

    useEffect(() => {
        if (data) {
            searchSalaryDetailList();
        }
    }, [data]);

    const searchSalaryDetailList = async () => {
        const result = await postApi<ISalaryListDetailBodyResponse>(MySalaryDetail.mySalaryDetailList, {
            searchPaymentMonth: data,
        });

        if (result) {
            setSalaryDetailList(result.salaryListDetail);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* 공제 항목 테이블 */}
            <StyledTable style={{ flex: 1, marginRight: "20px" }}>
                <thead>
                    <tr>
                        <StyledTh>공제항목</StyledTh>
                        <StyledTh>금액</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {salaryListDetail ? (
                        <>
                            <tr>
                                <StyledTd>국민연금</StyledTd>
                                <StyledTd>{salaryListDetail.nationalPension.toLocaleString()}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>건강보험료</StyledTd>
                                <StyledTd>{salaryListDetail.healthInsurance.toLocaleString()}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>고용보험</StyledTd>
                                <StyledTd>{salaryListDetail.employmentInsurance.toLocaleString()}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>산재보험</StyledTd>
                                <StyledTd>{salaryListDetail.industrialAccident.toLocaleString()}</StyledTd>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

            {/* 지급 항목 테이블 */}
            <StyledTable style={{ flex: 1 }}>
                <thead>
                    <tr>
                        <StyledTh>지급항목</StyledTh>
                        <StyledTh>금액</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {salaryListDetail ? (
                        <>
                            <tr>
                                <StyledTd>기본급</StyledTd>
                                <StyledTd>{salaryListDetail.baseSalary.toLocaleString()}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>비고금액</StyledTd>
                                <StyledTd>
                                    {salaryListDetail.additionalAmount
                                        ? salaryListDetail.additionalAmount.toLocaleString()
                                        : "없음"}
                                </StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>실급여</StyledTd>
                                <StyledTd>{salaryListDetail.totalSalary.toLocaleString()}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>연봉</StyledTd>
                                <StyledTd>{salaryListDetail.salary.toLocaleString()}</StyledTd>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </div>
    );
};
