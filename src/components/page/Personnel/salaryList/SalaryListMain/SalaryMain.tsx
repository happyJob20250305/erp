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

    const deductionColumns: Column<{ title: string; amount: number }>[] = [
        { key: "title", title: "공제항목" },
        { key: "amount", title: "금액", isMoney: true },
    ];

    const paymentColumns: Column<{ title: string; amount: number }>[] = [
        { key: "title", title: "지급항목" },
        { key: "amount", title: "금액", isMoney: true },
    ];

    const getDeductionData = () =>
        salaryListDetail
            ? [
                  { title: "국민연금", amount: salaryListDetail.nationalPension },
                  { title: "건강보험료", amount: salaryListDetail.healthInsurance },
                  { title: "고용보험", amount: salaryListDetail.employmentInsurance },
                  { title: "산재보험", amount: salaryListDetail.industrialAccident },
              ]
            : [];

    const getPaymentData = () =>
        salaryListDetail
            ? [
                  { title: "기본급", amount: salaryListDetail.baseSalary },
                  {
                      title: "비고금액",
                      amount: salaryListDetail.additionalAmount ?? 0, // undefined 또는 null이면 0으로 설정
                  },
                  { title: "실급여", amount: salaryListDetail.totalSalary },
                  { title: "연봉", amount: salaryListDetail.salary },
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
