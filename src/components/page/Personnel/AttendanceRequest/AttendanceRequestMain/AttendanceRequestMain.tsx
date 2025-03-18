import { useContext, useEffect, useState } from "react";
import { AttendanceRequestMainStyled } from "./styled";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { AttendanceContext } from "../../../../../api/Provider/AttendanceProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { AttendanceRequestModal } from "../AttendanceRequestModal/AttendanceRequestModal";
import { AttendanceRequestRejectModal } from "../AttendanceRequestRejectModal/AttendanceRequestRejectModal";
import { IAttendanceCnt, ILoginUserInfo } from "../../../../../models/interface/personnel/attendance/IAttendanceCnt";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { AttendanceRequest } from "../../../../../api/api";
import { IAttendance } from "../../../../../models/interface/personnel/attendance/IAttendance";

interface IAttendanceListResponse {
    attendanceList: IAttendance[],
    attendanceRequestCnt: number
}

interface IAttendanceCntResponse {
    attendanceCnt: IAttendanceCnt[]
    loginInfo: ILoginUserInfo
}

export const AttendanceRequestMain = () => {
    const loginUserInfo = sessionStorage.getItem("userInfo");
    const loginEmpId = JSON.parse(loginUserInfo).empId;

    const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
    const [attendanceRequestCnt, setAttendanceRequestCnt] = useState<number>(0);
    const [attendanceCnt, setAttendanceCnt] = useState<IAttendanceCnt[]>([]);
    const [loginInfo, setloginInfo] = useState<ILoginUserInfo>();
    const [cPage, setCPage] = useState<number>(0);
    const { searchKeyword } = useContext(AttendanceContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [modalType, setModalType] = useState<string>("detail");
    const [id, setId] = useState<number>(0);
    const [attId, setAttId] = useState<number>(0);

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
        { key: "attCnt", title: "총연차" },
        { key: "useAttCnt", title: "사용연차" },
        { key: "leftAttCnt", title: "남은연차" },
    ] as Column<IAttendanceCnt>[];

    useEffect(() => {
        searchAttendanceList();
    }, [searchKeyword])

    const searchAttendanceList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result1 = await searchApi<IAttendanceCntResponse>(AttendanceRequest.searchAttendanceListCnt, {
            userIdx: loginEmpId
        })

        if (result1) {
            setAttendanceCnt(result1.attendanceCnt);
            setloginInfo(result1.loginInfo);
        }

        const result2 = await searchApi<IAttendanceListResponse>(AttendanceRequest.searchAttendanceList, {
            ...searchKeyword,
            userIdx: loginEmpId,
            pageSize: 5,
            currentPage,
        })

        if (result2) {
            setAttendanceList(result2.attendanceList);
            setAttendanceRequestCnt(result2.attendanceRequestCnt);
            setCPage(currentPage);
            setAttId(result2.attendanceList[0]?.attId);
        }
    }

    const handlerDetailModal = (id: number) => {
        setId(id);
        setModal(!modal);
        setModalType("detail");
    }

    const handlerrejectReasonModal = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setId(id);
        setModal(!modal);
        setModalType("rejectReason");
    }

    const postSuccess = () => {
        setModal(!modal);
        searchAttendanceList();
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
                    row.reqStatus === "반려" && (
                        <StyledButton size="small" onClick={(e) => { handlerrejectReasonModal(row.id, e) }}>
                            반려사유
                        </StyledButton>
                    )
                }
                onCellClick={(row, columns) => {
                    handlerDetailModal(row.id);
                }}
            />
            <PageNavigate
                totalItemsCount={attendanceRequestCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchAttendanceList}
            />
            {
                modal && (
                    <Portal>
                        {
                            modalType === "detail" ?
                                (
                                    <AttendanceRequestModal id={id} setId={setId} loginInfo={loginInfo} attId={attId}
                                        attendanceCnt={attendanceCnt}
                                        postSuccess={postSuccess} />
                                ) :
                                (
                                    <AttendanceRequestRejectModal id={id} setId={setId} setModalType={setModalType} />
                                )
                        }
                    </Portal>
                )
            }
        </AttendanceRequestMainStyled>
    )
}