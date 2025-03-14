import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MonthlySearchStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const MonthlySearch = () => {
    const navigate = useNavigate();

    const getCurrentMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}`;
    };
    const [searchStMonth, setSearchStMonth] = useState<string>(getCurrentMonth);
    const [searchEdMonth, setSearchEdMonth] = useState<string>(getCurrentMonth);

    const monthlySearch = () => {
        const query: string[] = [];
        searchStMonth && query.push(`searchStDate=${searchStMonth}`);
        searchEdMonth && query.push(`searchEdDate=${searchEdMonth}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/sales/monthly${queryString}`);
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
