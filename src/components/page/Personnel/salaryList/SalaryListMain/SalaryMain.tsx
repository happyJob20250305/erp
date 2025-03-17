import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { StyledTable, Column } from "../../../../common/StyledTable/StyledTable";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { MySalaryDetail } from "../../../../../api/api";
import {
    ISalaryListDetail,
    ISalaryListDetailBodyResponse,
    SararyMainProps,
} from "../../../../../models/interface/personnel/salary/IsalaryMain";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { SalaryModal } from "../SalaryModal/SalaryModal";
import { SalalyListMainStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";

export const SalaryMain = ({ data }: SararyMainProps) => {
    const [salaryListDetail, setSalaryDetailList] = useState<ISalaryListDetail | null>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        if (data) searchSalaryDetailList();
    }, [data]);

    const searchSalaryDetailList = async () => {
        const result = await postApi<ISalaryListDetailBodyResponse>(MySalaryDetail.mySalaryDetailList, {
            searchPaymentMonth: data,
        });
        if (result?.salaryListDetail) setSalaryDetailList(result.salaryListDetail);
        else setSalaryDetailList(null);
    };

    const handleModal = () => setModal(!modal);

    const formatNumber = (num?: number | null) => (num ? num.toLocaleString() : "0");

    const deductionColumns: Column<{ title: string; amount: string }>[] = [
        { key: "title", title: "공제항목" },
        { key: "amount", title: "금액" },
    ];

    const paymentColumns: Column<{ title: string; amount: string }>[] = [
        { key: "title", title: "지급항목" },
        { key: "amount", title: "금액" },
    ];

    const getDeductionData = () =>
        salaryListDetail
            ? [
                  { title: "국민연금", amount: formatNumber(salaryListDetail.nationalPension) },
                  { title: "건강보험료", amount: formatNumber(salaryListDetail.healthInsurance) },
                  { title: "고용보험", amount: formatNumber(salaryListDetail.employmentInsurance) },
                  { title: "산재보험", amount: formatNumber(salaryListDetail.industrialAccident) },
              ]
            : [];

    const getPaymentData = () =>
        salaryListDetail
            ? [
                  { title: "기본급", amount: formatNumber(salaryListDetail.baseSalary) },
                  {
                      title: "비고금액",
                      amount: salaryListDetail.additionalAmount
                          ? formatNumber(salaryListDetail.additionalAmount)
                          : "없음",
                  },
                  { title: "실급여", amount: formatNumber(salaryListDetail.totalSalary) },
                  { title: "연봉", amount: formatNumber(salaryListDetail.salary) },
              ]
            : [];

    return (
        <>
            {salaryListDetail && (
                <SalalyListMainStyled>
                    <div className='info'>
                        <label>사번</label>
                        <StyledInput value={salaryListDetail.employeeNumber} readOnly />
                        <label>사원명</label>
                        <StyledInput value={salaryListDetail.employeeName} readOnly />
                        <label>근무연차</label>
                        <StyledInput value={salaryListDetail.workingYear} readOnly />
                    </div>

                    <div className='tables'>
                        {/* 공제항목 테이블 */}
                        <StyledTable data={getDeductionData()} columns={deductionColumns} fullWidth={true} />

                        <img
                            src='/help_question_icon.png'
                            style={{ width: "30px", height: "30px" }}
                            onClick={handleModal}
                        />

                        {/* 지급항목 테이블 */}
                        <StyledTable data={getPaymentData()} columns={paymentColumns} fullWidth={true} />
                    </div>
                    {modal && (
                        <Portal>
                            <SalaryModal />
                        </Portal>
                    )}
                </SalalyListMainStyled>
            )}
        </>
    );
};
