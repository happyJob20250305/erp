import { useContext, useRef } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton"
import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { DepartmentSearchStyled } from "./styled"
import { SystemContext } from "../../../../../api/Provider/SystemProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export const DepartmentSearch = () => {
    const title = useRef<HTMLInputElement>();
    const { setSearchKeyword } = useContext(SystemContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);

    const handlerSearch = () => {
        setSearchKeyword({
            searchDepartmentName: title.current.value
        })
    }

    return (
        <DepartmentSearchStyled>
            <div className="search-bar">
                <span>부서명</span>
                <StyledInput ref={title}></StyledInput>
            </div>
            <div className="button-container">
                <StyledButton variant='secondary' onClick={handlerSearch}>조회</StyledButton>
                <StyledButton onClick={() => { setModal(!modal) }}>등록</StyledButton>
            </div>
        </DepartmentSearchStyled>
    )
}