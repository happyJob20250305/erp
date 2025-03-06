import { useContext, useEffect, useRef } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeSearchStyled } from "./styled";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export const CommonCodeSearch = () => {
    const title = useRef<HTMLInputElement>();
    const note = useRef<HTMLInputElement>();
    const { setSearchKeyword } = useContext(CommonCodeContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);

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
            <StyledButton onClick={() => { setModal(!modal) }}>등록</StyledButton>
        </CommonCodeSearchStyled>
    );
};
