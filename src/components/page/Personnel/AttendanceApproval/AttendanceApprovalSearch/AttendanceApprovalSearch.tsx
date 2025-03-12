import { useContext, useState } from "react";
import { AttendanceApprovalSearchStyled } from "./styled"
import { AttendanceContext } from "../../../../../api/Provider/AttendanceProvider";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const AttendanceApprovalSearch = () => {
    const { setSearchKeyword } = useContext(AttendanceContext);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [number, setNumber] = useState<string>();
    const [name, setName] = useState<string>();
    const [selectReqStatusValue, setSelectReqStatusValue] = useState<string>("");

    const optionsReqStatus = [
        { label: "전체", value: "" },
        { label: "검토 대기", value: "검토 대기" },
        { label: "승인 대기", value: "승인 대기" },
        { label: "승인", value: "승인" },
        { label: "반려", value: "반려" },
    ]

    const handlerSearch = () => {
        setSearchKeyword({
            searchStDate: startDate,
            searchEdDate: endDate,
            searchNumber: number,
            searchName: name,
            searchReqStatus: selectReqStatusValue
        })
    }

    return (
        <AttendanceApprovalSearchStyled>
            <span>기간</span>
            <StyledInput type='date' onChange={(e) => { setStartDate(e.target.value) }} />
            <span>~</span>
            <StyledInput type='date' onChange={(e) => { setEndDate(e.target.value) }} />
            <span>사번</span>
            <StyledInput type='text' width={100} onChange={(e) => { setNumber(e.target.value) }} />
            <span>사원명</span>
            <StyledInput type='text' onChange={(e) => { setName(e.target.value) }} />
            <span>승인상태</span>
            <StyledSelectBox
                options={optionsReqStatus}
                value={selectReqStatusValue}
                onChange={setSelectReqStatusValue}
            />
            <StyledButton variant='secondary' onClick={handlerSearch}>검색</StyledButton>
        </AttendanceApprovalSearchStyled>
    )
}