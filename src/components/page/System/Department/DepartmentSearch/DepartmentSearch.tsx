import { useContext, useRef } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton"
import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { DepartmentSearchStyled } from "./styled"
import { SystemContext } from "../../../../../api/Provider/SystemProvider";

export const DepartmentSearch = () => {
    const title = useRef<HTMLInputElement>();
    const { setSearchKeyword } = useContext(SystemContext);

    const handlerSearch = () => {
        setSearchKeyword({
            searchDepartmentName: title.current.value
        })
    }

    return (
        <DepartmentSearchStyled>
            <span>부서명</span>
            <StyledInput ref={title}></StyledInput>
            <StyledButton variant='secondary' onClick={handlerSearch}>검색</StyledButton>
            <StyledButton>등록</StyledButton>
        </DepartmentSearchStyled>
    )
}