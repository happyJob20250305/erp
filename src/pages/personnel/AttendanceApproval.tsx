import { AttendanceProvider } from "../../api/Provider/AttendanceProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { AttendanceApprovalMain } from "../../components/page/Personnel/AttendanceApproval/AttendanceApprovalMain/AttendanceApprovalMain";
import { AttendanceApprovalSearch } from "../../components/page/Personnel/AttendanceApproval/AttendanceApprovalSearch/AttendanceApprovalSearch";

export const AttendanceApproval = () => {
    const loginUserInfo = sessionStorage.getItem("userInfo");
    const loginUserType = JSON.parse(loginUserInfo).userType;
    const loginUserEmpid = JSON.parse(loginUserInfo).empId;

    return (
        <AttendanceProvider>
            <ContentBox variant='primary' fontSize='large'>
                근태 조회 및 승인
            </ContentBox>
            <AttendanceApprovalSearch loginUserType={loginUserType}></AttendanceApprovalSearch>
            <AttendanceApprovalMain loginUserType={loginUserType} loginUserEmpid={loginUserEmpid}></AttendanceApprovalMain>
        </AttendanceProvider >
    );
};
