import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { AnnualSearchStyled } from "./styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { AnnualListContext } from "../../../../../api/Provider/SalesProvider/AnnualProvider";

export const AnnualSearch = () => {
    const { setSearchKeyword } = useContext(AnnualListContext);
    const getCurrentYear = () => new Date().getFullYear().toString();

    const [searchStYear, setSearchStYear] = useState<string>(getCurrentYear());
    const [searchEdYear, setSearchEdYear] = useState<string>(getCurrentYear());
    const [yearOptions, setYearOptions] = useState<{ label: string; value: string }[]>([]);

    const annualSearch = () => {
        setSearchKeyword({
            searchStDate: searchStYear,
            searchEdDate: searchEdYear,
        });
    };

    useEffect(() => {
        const years = [];
        for (let i = 1990; i <= 2025; i++) {
            years.push({ label: `${i}년`, value: `${i}` });
        }
        setYearOptions(years);
        annualSearch();
    }, []);

    return (
        <AnnualSearchStyled>
            <div>
                <label>기간</label>
                <StyledSelectBox
                    options={yearOptions}
                    value={searchStYear}
                    onChange={(value: string | number) => setSearchStYear(value.toString())}
                />
                ~
                <StyledSelectBox
                    options={yearOptions}
                    value={searchEdYear}
                    onChange={(value: string | number) => setSearchEdYear(value.toString())}
                />
                <StyledButton variant='secondary' onClick={annualSearch}>
                    조회
                </StyledButton>
            </div>
        </AnnualSearchStyled>
    );
};
