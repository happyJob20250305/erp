import { useState } from "react";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";

import { SalaryMain } from "../../components/page/Personnel/salaryList/SalaryListMain/SalaryMain";
import { SalaryListSearch } from "../../components/page/Personnel/salaryList/SalaryListSearch/SalaryListSearch";
import { PageNavigate } from "../../components/common/pageNavigation/PageNavigate";

export const MySalary = () => {
    const [searchPaymentMonth, setSearchPaymentMonth] = useState<string>("");

    const handleSearch = (data: string) => {
        setSearchPaymentMonth(data);
    };

    return (
        <>
            <ContentBox>급여 조회</ContentBox>
            <SalaryListSearch onSearch={handleSearch} />
            <SalaryMain data={searchPaymentMonth} />
        </>
    );
};
