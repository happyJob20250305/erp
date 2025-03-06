import { Button } from "react-bootstrap";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { useEffect, useRef, useState } from "react";
import { NoticeSearchStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export const NoticeSearch = () => {

    const title = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState<Boolean>(modalState);

    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace: true });
    }, [])

    const handlerSearch = () => {
        const query: string[] = [];

        !title.current.value || query.push(`searchTitle=${title.current.value}`);
        !startDate || query.push(`searchStDate=${startDate}`);
        !endDate || query.push(`searchEdDate=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/system/notice${queryString}`);
    }

    return (
        <NoticeSearchStyled>
            <span>제목</span>
            <StyledInput ref={title}></StyledInput>
            <span>기간</span>
            <StyledInput type='date' onChange={(e) => { setStartDate(e.target.value) }}></StyledInput>
            <span>~</span>
            <StyledInput type='date' onChange={(e) => { setEndDate(e.target.value) }}></StyledInput>
            <StyledButton variant='secondary' onClick={handlerSearch}>검색</StyledButton>
            <StyledButton onClick={() => { setModal(!modal) }}>등록</StyledButton>
        </NoticeSearchStyled>
    );
};
