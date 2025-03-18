import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { AnnualSearchStyled } from "./styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { AnnualListContext } from "../../../../../api/Provider/SalesProvider/AnnualProvider";

export const AnnualSearch = () => {
    const { setSearchKeyword } = useContext(AnnualListContext);
    // 현재 연도 가져오기
    const getCurrentYear = () => new Date().getFullYear().toString();

    // 상태값 설정
    const [searchStYear, setSearchStYear] = useState<string>(getCurrentYear());
    const [searchEdYear, setSearchEdYear] = useState<string>(getCurrentYear());
    const [yearOptions, setYearOptions] = useState<{ label: string; value: string }[]>([]);

    // 검색 실행 함수
    const annualSearch = () => {
        setSearchKeyword({
            searchStDate: searchStYear,
            searchEdDate: searchEdYear,
        });
    };

    // 연도 옵션 생성
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
