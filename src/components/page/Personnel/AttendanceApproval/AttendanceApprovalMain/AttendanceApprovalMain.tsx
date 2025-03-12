import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { AttendanceApprovalMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";

export interface IAttendance {
    id: number,
    attId: number,
    attAppId: number,
    empId: number,
    number: number,
    reqType: string,
    reqSt: string,
    reqEd: string,
    reqStatus: string,
    name: string,
    appType: string | null,
    appReason: string | null,
}

interface IAttendanceListResponse {
    attendanceList: IAttendance[],
    attendanceRequestCnt: number
}

export const AttendanceApprovalMain = () => {
    const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
    const [attendanceRequestCnt, setAttendanceRequestCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    const columns = [
        { key: "id", title: "번호" },
        { key: "reqType", title: "연차종류" },
        { key: "number", title: "사번" },
        { key: "name", title: "사원명" },
        { key: "reqSt", title: "시작일" },
        { key: "reqEd", title: "종료일" },
        { key: "appType", title: "결재자" },
        { key: "reqStatus", title: "승인상태" },
    ] as Column<IAttendance>[];

    useEffect(() => {
        searchAttendanceList();
    }, [])

    const searchAttendanceList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios.post("/personnel/attendanceListBody.do", {
            pageSize: 5,
            currentPage,
        }).then((res: AxiosResponse<IAttendanceListResponse>) => {
            setAttendanceList(res.data.attendanceList);
            setAttendanceRequestCnt(res.data.attendanceRequestCnt);
            setCPage(currentPage);
        })
    }

    return (
        <AttendanceApprovalMainStyled>
            <StyledTable
                columns={columns}
                data={attendanceList}
                hoverable={true}
                fullWidth={true}
            />
            <PageNavigate
                totalItemsCount={attendanceRequestCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchAttendanceList}
            />
        </AttendanceApprovalMainStyled>
    )
}