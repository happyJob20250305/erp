import { AttendanceProvider } from "../../api/Provider/AttendanceProvider"
import { ContentBox } from "../../components/common/ContentBox/ContentBox"
import { AttendanceApprovalMain } from "../../components/page/Personnel/AttendanceApproval/AttendanceApprovalMain/AttendanceApprovalMain"
import { AttendanceApprovalSearch } from "../../components/page/Personnel/AttendanceApproval/AttendanceApprovalSearch/AttendanceApprovalSearch"

export const AttendanceApproval = () => {
    return (
        <AttendanceProvider>
            <ContentBox variant='primary' fontSize='large'>
                근태 조회 및 승인
            </ContentBox>
            <AttendanceApprovalSearch></AttendanceApprovalSearch>
            <AttendanceApprovalMain></AttendanceApprovalMain>
        </AttendanceProvider>
    )
}