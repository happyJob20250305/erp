import { ContentBox } from "../../components/common/ContentBox/ContentBox"
import { AttendanceRequestMain } from "../../components/page/Personnel/AttendanceRequest/AttendanceRequestMain/AttendanceRequestMain"

export const AttendanceRequest = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                근태 신청
            </ContentBox>
            <AttendanceRequestMain></AttendanceRequestMain>
        </>

    )
}