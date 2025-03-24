import { useContext, useEffect, useState } from "react";
import { MonthlySearchStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { MonthlyListContext } from "../../../../../api/Provider/SalesProvider/MonthlyProvider";

export const MonthlySearch = () => {
    const { setSearchKeyword } = useContext(MonthlyListContext);
    const getCurrentMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
    };
    const [searchStMonth, setSearchStMonth] = useState<string>(getCurrentMonth);
    const [searchEdMonth, setSearchEdMonth] = useState<string>(getCurrentMonth);

    const monthlySearch = () => {
        setSearchKeyword({
            searchStDate: searchStMonth,
            searchEdDate: searchEdMonth,
        });
    };
    useEffect(() => {
        monthlySearch();
    }, []);
    return (
        <MonthlySearchStyled>
            <div>
                <label>기간</label>
                <StyledInput
                    type='month'
                    value={searchStMonth}
                    onChange={(e) => setSearchStMonth(e.target.value)}
                ></StyledInput>
                <StyledInput
                    type='month'
                    value={searchEdMonth}
                    onChange={(e) => setSearchEdMonth(e.target.value)}
                ></StyledInput>
                <StyledButton variant='secondary' onClick={monthlySearch}>
                    조회
                </StyledButton>
            </div>
        </MonthlySearchStyled>
    );
};
