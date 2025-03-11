import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { MySalaryDetail } from "../../../../../api/api";
import {
    ISalaryListDetail,
    ISalaryListDetailBodyResponse,
    SararyMainProps,
} from "../../../../../models/interface/personnel/salary/IsalaryMain";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { SalaryModal } from "../SalaryModal/SalaryModal";

// const QuestionIcon = CiCircleQuestion as unknown as React.FC;

export const SalaryMain = ({ data }: SararyMainProps) => {
    const [salaryListDetail, setSalaryDetailList] = useState<ISalaryListDetail | null>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    useEffect(() => {
        if (data) {
            searchSalaryDetailList();
        }
    }, [data]);

    const searchSalaryDetailList = async () => {
        const result = await postApi<ISalaryListDetailBodyResponse>(MySalaryDetail.mySalaryDetailList, {
            searchPaymentMonth: data,
        });

        if (result?.salaryListDetail) {
            setSalaryDetailList(result.salaryListDetail);
        } else {
            setSalaryDetailList(null);
        }
    };

    const handleModal = () => {
        setModal(!modal);
    };

    // 안전한 숫자 포맷팅 헬퍼함수
    const formatNumber = (num?: number | null) => (num ? num.toLocaleString() : "0");

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
                                <StyledTd>{formatNumber(salaryListDetail.nationalPension)}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>건강보험료</StyledTd>
                                <StyledTd>{formatNumber(salaryListDetail.healthInsurance)}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>고용보험</StyledTd>
                                <StyledTd>{formatNumber(salaryListDetail.employmentInsurance)}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>산재보험</StyledTd>
                                <StyledTd>{formatNumber(salaryListDetail.industrialAccident)}</StyledTd>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

            <>
                <img src='/help_question_icon.png' style={{ width: "30px", height: "30px" }} onClick={handleModal} />
            </>
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
                                <StyledTd>{formatNumber(salaryListDetail.baseSalary)}</StyledTd>
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
                                <StyledTd>{formatNumber(salaryListDetail.totalSalary)}</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>연봉</StyledTd>
                                <StyledTd>{formatNumber(salaryListDetail.salary)}</StyledTd>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

            {modal && (
                <Portal>
                    <SalaryModal></SalaryModal>
                </Portal>
            )}
        </div>
    );
};
