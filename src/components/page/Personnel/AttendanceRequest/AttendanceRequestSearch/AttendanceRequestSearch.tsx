import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox"

export const AttendanceRequestSearch = () => {

    return (
        <>
            <span>기간</span>
            <StyledInput type='date' ></StyledInput>
            <span>~</span>
            <StyledInput type='date' ></StyledInput>
            <span>연차타입</span>
            <span>승인상태</span>
        </>
    )
}