import { AttendanceProvider } from "../../api/Provider/AttendanceProvider"
import { ContentBox } from "../../components/common/ContentBox/ContentBox"
import { AttendanceRequestMain } from "../../components/page/Personnel/AttendanceRequest/AttendanceRequestMain/AttendanceRequestMain"
import { AttendanceRequestSearch } from "../../components/page/Personnel/AttendanceRequest/AttendanceRequestSearch/AttendanceRequestSearch"

export const AttendanceRequest = () => {
    return (
        <AttendanceProvider>
            <ContentBox variant='primary' fontSize='large'>
                근태 신청
            </ContentBox>
            <AttendanceRequestSearch></AttendanceRequestSearch>
            <AttendanceRequestMain></AttendanceRequestMain>
        </AttendanceProvider>

    )
}