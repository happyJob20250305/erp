import { useContext, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox"
import { AttendanceRequestSearchStyled } from "./styled"
import { AttendanceContext } from "../../../../../api/Provider/AttendanceProvider";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const AttendanceRequestSearch = () => {
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [selectReqStatusValue, setSelectReqStatusValue] = useState<string>("");
    const [selectReqTypeValue, setSelectReqTypeValue] = useState<string>("");
    const { setSearchKeyword } = useContext(AttendanceContext);

    const optionsReqType = [
        { label: "전체", value: "" },
        { label: "연차", value: "연차" },
        { label: "반차", value: "반차" }
    ]

    const optionsReqStatus = [
        { label: "전체", value: "" },
        { label: "검토 대기", value: "검토 대기" },
        { label: "승인 대기", value: "승인 대기" },
        { label: "승인", value: "승인" },
        { label: "반려", value: "반려" },
        { label: "취소", value: "취소" }
    ]

    const handlerSearch = () => {
        setSearchKeyword({
            searchStDate: startDate,
            searchEdDate: endDate,
            searchReqStatus: selectReqStatusValue,
            searchReqType: selectReqTypeValue,
        })
    }

    return (
        <AttendanceRequestSearchStyled>
            <span>기간</span>
            <StyledInput type='date' onChange={(e) => { setStartDate(e.target.value) }}></StyledInput>
            <span>~</span>
            <StyledInput type='date' onChange={(e) => { setEndDate(e.target.value) }}></StyledInput>
            <span>연차타입</span>
            <StyledSelectBox
                options={optionsReqType}
                value={selectReqTypeValue}
                onChange={setSelectReqTypeValue}
            />
            <span>승인상태</span>
            <StyledSelectBox
                options={optionsReqStatus}
                value={selectReqStatusValue}
                onChange={setSelectReqStatusValue}
            />
            <StyledButton variant='secondary' onClick={handlerSearch}>검색</StyledButton>
        </AttendanceRequestSearchStyled>
    )
}