import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { useContext, useRef, useState } from "react";
import { NoticeSearchStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { SystemContext } from "../../../../../api/Provider/SystemProvider";

export const NoticeSearch = () => {
    const title = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const { setSearchKeyword } = useContext(SystemContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);

    const handlerSearch = () => {
        setSearchKeyword({
            searchTitle: title.current.value,
            searchStDate: startDate,
            searchEdDate: endDate
        })
    }

    return (
        <NoticeSearchStyled>
            <div className="searchBar">
                <span>제목</span>
                <StyledInput ref={title}></StyledInput>
                <span>기간</span>
                <StyledInput type='date' onChange={(e) => { setStartDate(e.target.value) }}
                    onKeyDown={(e) => e.preventDefault()} max={endDate} />
                <span>~</span>
                <StyledInput type='date' onChange={(e) => { setEndDate(e.target.value) }}
                    onKeyDown={(e) => e.preventDefault()} min={startDate} />
            </div>
            <div className="button-container">
                <StyledButton variant='secondary' onClick={handlerSearch}>조회</StyledButton>
                <StyledButton onClick={() => { setModal(!modal) }}>등록</StyledButton>
            </div>
        </NoticeSearchStyled>
    );
};
