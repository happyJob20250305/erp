import { useEffect, useState } from "react";
import {
    ISalaryDetail,
    ISalaryDetailResponse,
    SalaryManagerDetailProps,
} from "../../../../../models/interface/personnel/salary/ISalaryManagerDetail";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { SalaryManager } from "../../../../../api/api";
// import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { SalalyManagerDetailStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { IDepartmentGroupItem, IJobGradeGroupItem } from "../../../../../models/interface/personnel/salary/IOptionList";

export const SalaryManagerDetail = ({ data }: SalaryManagerDetailProps) => {
    // data는 props로부터 전달받은 employeeNumber라고 가정

    const [salaryDetail, setSalaryDetail] = useState<ISalaryDetail[]>([]);

    const [employeeNumber, setEmployeeNumber] = useState<number>();

    const columns: Column<ISalaryDetail>[] = [
        { key: "employeeName", title: "사원명" },
        { key: "salary", title: "직급" },
        { key: "baseSalary", title: "부서명" },
        { key: "nationalPension", title: "사번" },
        { key: "healthInsurance", title: "연봉", isMoney: true },
        { key: "baseSalary", title: "기본급", isMoney: true },
        { key: "nationalPension", title: "국민연금", isMoney: true },
        { key: "healthInsurance", title: "건강보험료", isMoney: true },
        { key: "industrialAccident", title: "산재보험", isMoney: true },
        { key: "employmentInsurance", title: "고용보험", isMoney: true },
        { key: "additionalAmount", title: "비고금액", isMoney: true },
        { key: "paymentDate", title: "지급일" },
    ];
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

    const closeDetail = () => {
        setSalaryDetail([]); // ⬅️ `null` 대신 빈 배열로 변경
    };

    return (
        <>
            {salaryDetail && salaryDetail.length > 0 && (
                <SalalyManagerDetailStyled>
                    <StyledButton size='small' onClick={closeDetail}>
                        닫기
                    </StyledButton>
                    <StyledTable
                        columns={columns}
                        data={salaryDetail}
                        striped
                        // bordered
                        hoverable
                        fullWidth
                    />
                </SalalyManagerDetailStyled>
            )}
        </>
    );
};
