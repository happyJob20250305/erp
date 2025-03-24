import { ContentBox } from "../../components/common/ContentBox/ContentBox"
import { AttendanceListMain } from "../../components/page/Personnel/AttendanceList/AttendanceListMain/AttendanceListMain"

export const AttendanceList = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                근태 현황 조회
            </ContentBox>
            <AttendanceListMain></AttendanceListMain>
        </>
    )
}