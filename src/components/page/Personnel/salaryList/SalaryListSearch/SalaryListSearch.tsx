import { useEffect, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { SalalyListSearchStyled } from "./styled";

interface SalaryListSearchProps {
    onSearch: (data: string) => void;
}

export const SalaryListSearch = ({ onSearch }: SalaryListSearchProps) => {
    const [searchPaymentMonth, setSearchPaymentMonth] = useState<string>("");

    useEffect(() => {
        window.location.search;
    }, []);

    const handlerSearch = () => {
        onSearch(searchPaymentMonth);
    };

    return (
        <SalalyListSearchStyled>
            <StyledInput
                type='month'
                value={searchPaymentMonth}
                onChange={(e) => setSearchPaymentMonth(e.target.value)}
            />
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
        </SalalyListSearchStyled>
    );
};
