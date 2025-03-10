import { useState } from "react";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { SalaryManagerDetail } from "../../components/page/Personnel/selaryManager/SalaryManagerDetail/SalaryManagerDetail";

import { SalaryManagerMain } from "../../components/page/Personnel/selaryManager/SalaryManagerMain/SalaryManagerMain";
import { SalaryManagerSearch } from "../../components/page/Personnel/selaryManager/SalaryManagerSearch/SalaryManagerSearch";
import { SalarySearchProvider } from "../../api/Provider/SalaryMangerProvider/SalaryManagerProvider";

export const SalaryManager = () => {
    const [employeeNumber, setEmployeeNumber] = useState<number>();

    const petchData = (data: number) => {
        setEmployeeNumber(data);
    };

    return (
        <>
            <SalarySearchProvider>
                <ContentBox variant='light' fontSize='large'>
                    급여 관리
                    <SalaryManagerSearch />
                </ContentBox>
                <SalaryManagerMain Pdata={petchData} />
                <SalaryManagerDetail data={employeeNumber} />
            </SalarySearchProvider>
        </>
    );
};
