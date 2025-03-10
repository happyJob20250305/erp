import { useEffect, useState } from "react";
import { AttendanceRequestMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState, useRecoilValue } from "recoil";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";


interface IAttendance {
    id: number,
    attId: number,
    attAppId: number,
    empId: number,
    number: number,
    reqType: string,
    // reqdate: string | null,
    // candate: string | null,
    reqSt: string,
    reqEd: string,
    // reqDay: null,
    // reqReason: null,
    reqStatus: string,
    name: string,
    // deptName: null,
    appType: string | null,
    appReason: string | null,
}

interface IAttendanceCnt {
    useAttCnt: number,
    attCnt: number,
    leftAttCnt: number
}

interface IAttendanceListResponse {
    attendanceList: IAttendance[],
    attendanceRequestCnt: number
}

interface IAttendanceCntResponse {
    attendanceCnt: IAttendanceCnt[]
}

export const AttendanceRequestMain = () => {
    const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
    const [attendanceRequestCnt, setAttendanceRequestCnt] = useState<number>(0);
    const [attendanceCnt, setAttendanceCnt] = useState<IAttendanceCnt[]>([]);
    const [cPage, setCPage] = useState<number>(0);
    const userInfo = sessionStorage.getItem("userInfo");
    const loginEmpId = JSON.parse(userInfo).empId;

    const columns = [
        { key: "id", title: "번호" },
        { key: "reqType", title: "연차종류" },
        { key: "number", title: "사번" },
        { key: "name", title: "사원명" },
        { key: "reqSt", title: "시작일" },
        { key: "reqEd", title: "종료일" },
        { key: "appType", title: "결재자" },
        { key: "reqStatus", title: "승인상태" },
        { key: "actions", title: "반려" },
    ] as Column<IAttendance>[];

    const columnsCnt = [
        { key: "useAttCnt", title: "총연차" },
        { key: "attCnt", title: "사용연차" },
        { key: "leftAttCnt", title: "남은연차" },
    ] as Column<IAttendanceCnt>[];

    useEffect(() => {
        searchAttendanceList();
    }, [])

    const searchAttendanceList = (currentPage?: number) => {
        currentPage = currentPage || 1;

        axios.post("/personnel/attendanceListBody.do", {
            userIdx: loginEmpId,
            pageSize: 5,
            currentPage,
        }).then((res: AxiosResponse<IAttendanceListResponse>) => {
            setAttendanceList(res.data.attendanceList);
            setAttendanceRequestCnt(res.data.attendanceRequestCnt);
            setCPage(currentPage);
        })

        axios.post("/personnel/attendanceCntBody.do", {
            userIdx: loginEmpId
        }).then((res: AxiosResponse<IAttendanceCntResponse>) => {
            setAttendanceCnt(res.data.attendanceCnt);
        })
    }

    return (
        <AttendanceRequestMainStyled>
            <StyledTable
                columns={columnsCnt}
                data={attendanceCnt}
                fullWidth={true}
            />
            <StyledTable
                columns={columns}
                data={attendanceList}
                hoverable={true}
                fullWidth={true}
                renderAction={(row) =>
                    row.reqStatus === "반려" ?
                        (
                            <StyledButton size="small">
                                반려사유
                            </StyledButton>
                        )
                        : (<>-</>)
                }
            />
            <PageNavigate
                totalItemsCount={attendanceRequestCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchAttendanceList}
            />
        </AttendanceRequestMainStyled>
    )
}