import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { AnnualSearchStyled } from "./styled";

export const AnnualSearch = () => {
    const navigate = useNavigate();

    const getCurrentYear = () => {
        const now = new Date();
        const year = now.getFullYear();
        return `${year}`;
    };
    const [searchStYear, setSearchStYear] = useState<string>(getCurrentYear);
    const [searchEdYear, setSearchEdYear] = useState<string>(getCurrentYear);

    const annualSearch = () => {
        const query: string[] = [];
        searchStYear && query.push(`searchStDate=${searchStYear}`);
        searchEdYear && query.push(`searchEdDate=${searchEdYear}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/sales/annual${queryString}`);
    };

    useEffect(() => {
        annualSearch();
    });
    return (
        <AnnualSearchStyled>
            <div>
                <label>기간</label>
                <StyledInput
                    type='date'
                    value={searchStYear}
                    onChange={(e) => setSearchStYear(e.target.value.split("-")[0])}
                ></StyledInput>
                <StyledInput
                    type='date'
                    value={searchEdYear}
                    onChange={(e) => setSearchEdYear(e.target.value.split("-")[0])}
                ></StyledInput>
                <StyledButton variant='secondary' onClick={annualSearch}>
                    조회
                </StyledButton>
            </div>
        </AnnualSearchStyled>
    );
};
