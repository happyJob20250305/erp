import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MonthlySearchStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const MonthlySearch = () => {
    const [searchStMonth, setSearchStMonth] = useState<string>();
    const [searchEdMonth, setSearchEdMonth] = useState<string>();
    const navigate = useNavigate();

    const monthlySearch = () => {
        const query: string[] = [];
        searchStMonth && query.push(`searchStDate=${searchStMonth}`);
        searchEdMonth && query.push(`searchEdDate=${searchEdMonth}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/sales/monthly${queryString}`);
    };
    return (
        <MonthlySearchStyled>
            <div>
                <label>기간</label>
                <StyledInput type='month' onChange={(e) => setSearchStMonth(e.target.value)}></StyledInput>
                <StyledInput type='month' onChange={(e) => setSearchEdMonth(e.target.value)}></StyledInput>
                <StyledButton variant='secondary' onClick={monthlySearch}>
                    조회
                </StyledButton>
            </div>
        </MonthlySearchStyled>
    );
};
