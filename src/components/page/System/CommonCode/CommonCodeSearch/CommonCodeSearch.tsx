import { useContext, useEffect, useRef } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeSearchStyled } from "./styled";
import { Navigate } from "react-router-dom";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";

export const CommonCodeSearch = () => {
    const title = useRef<HTMLInputElement>();
    const note = useRef<HTMLInputElement>();

    const { setSearchKeyword } = useContext(CommonCodeContext);

    const handlerSearch = () => {
        setSearchKeyword({
            searchGroupName: title.current.value,
            searchGroupNote: note.current.value
        })
    }

    return (
        <CommonCodeSearchStyled>
            <span>공통코드명</span>
            <StyledInput ref={title} />
            <span>비고</span>
            <StyledInput ref={note} />
            <StyledButton onClick={handlerSearch}>검색</StyledButton>
            <StyledButton>등록</StyledButton>
        </CommonCodeSearchStyled>
    );
};
