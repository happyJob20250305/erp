import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { AnnualSearchStyled } from "./styled";

export const AnnualSearch = () => {
    const [searchStYear, setSearchStYear] = useState<string>();
    const [searchEdYear, setSearchEdYear] = useState<string>();
    const navigate = useNavigate();

    const annualSearch = () => {
        const query: string[] = [];
        searchStYear && query.push(`searchStDate=${searchStYear}`);
        searchEdYear && query.push(`searchEdDate=${searchEdYear}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/sales/annual${queryString}`);
    };
    return (
        <AnnualSearchStyled>
            <div>
                <label>기간</label>
                <StyledInput type='date' onChange={(e) => setSearchStYear(e.target.value.split("-")[0])}></StyledInput>
                <StyledInput type='date' onChange={(e) => setSearchEdYear(e.target.value.split("-")[0])}></StyledInput>
                <StyledButton variant='secondary' onClick={annualSearch}>
                    조회
                </StyledButton>
            </div>
        </AnnualSearchStyled>
    );
};
