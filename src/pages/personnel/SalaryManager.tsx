import { useState } from "react";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { SalaryManagerDetail } from "../../components/page/Personnel/selaryManager/SalaryManagerDetail/SalaryManagerDetail";

import { SalaryManagerMain } from "../../components/page/Personnel/selaryManager/SalaryManagerMain/SalaryManagerMain";
import { SalaryManagerSearch } from "../../components/page/Personnel/selaryManager/SalaryManagerSearch/SalaryManagerSearch";

export const SalaryManager = () => {
    const [employeeNumber, setEmployeeNumber] = useState<number>();

    //사원명
    const [searchEmployeeName, setSearchEmployeeName] = useState<string>("");
    // 부서
    const [department, setDepartment] = useState<string>("");
    //지급 여부
    const [searchPaymentStatus, setSearchPaymentStatus] = useState<number>();
    //급여 연월
    const [searchPaymentMonth, setSearchPaymentMonth] = useState<string>("");
    //직급
    const [jobGrade, setJobGrade] = useState<string>("");

    const petchData = (data: number) => {
        setEmployeeNumber(data);
    };

    return (
        <>
            <ContentBox variant='light' fontSize='large'>
                급여 관리
                <SalaryManagerSearch />
            </ContentBox>
            <SalaryManagerMain Pdata={petchData} />
            <SalaryManagerDetail data={employeeNumber} />
        </>
    );
};
