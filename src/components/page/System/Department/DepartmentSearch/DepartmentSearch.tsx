import { StyledButton } from "../../../../common/StyledButton/StyledButton"
import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { DepartmentSearchStyled } from "./styled"

export const DepartmentSearch = () => {


    return (
        <DepartmentSearchStyled>
            <span>부서명</span>
            <StyledInput></StyledInput>
            <StyledButton variant='secondary'>검색</StyledButton>
            <StyledButton>등록</StyledButton>
        </DepartmentSearchStyled>
    )
}