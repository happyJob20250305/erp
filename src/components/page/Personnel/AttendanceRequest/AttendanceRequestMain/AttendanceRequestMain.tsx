import { useContext, useEffect, useState } from "react";
import { AttendanceRequestMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { AttendanceContext } from "../../../../../api/Provider/AttendanceProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { AttendanceRequestModal } from "../AttendanceRequestModal/AttendanceRequestModal";
import { AttendanceRequestRejectModal } from "../AttendanceRequestRejectModal/AttendanceRequestRejectModal";


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

export interface IAttendanceCnt {
    useAttCnt: number,
    attCnt: number,
    leftAttCnt: number
}

export interface IloginInfo {
    detail_name: string, //부서
    usr_nm: string,
    usr_idx: number, //사번
}

interface IAttendanceListResponse {
    attendanceList: IAttendance[],
    attendanceRequestCnt: number
}

interface IAttendanceCntResponse {
    attendanceCnt: IAttendanceCnt[]
    loginInfo: IloginInfo
}

export const AttendanceRequestMain = () => {
    const loginUserInfo = sessionStorage.getItem("userInfo");
    const loginEmpId = JSON.parse(loginUserInfo).empId;

    const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
    const [attendanceRequestCnt, setAttendanceRequestCnt] = useState<number>(0);
    const [attendanceCnt, setAttendanceCnt] = useState<IAttendanceCnt[]>([]);
    const [loginInfo, setloginInfo] = useState<IloginInfo>();

    const [cPage, setCPage] = useState<number>(0);
    const { searchKeyword } = useContext(AttendanceContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [modalType, setModalType] = useState<string>();

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

    const searchAttendanceList = (currentPage?: number) => {
        currentPage = currentPage || 1;

        axios.post("/personnel/attendanceCntBody.do", {
            userIdx: loginEmpId
        }).then((res: AxiosResponse<IAttendanceCntResponse>) => {
            setAttendanceCnt(res.data.attendanceCnt);
            setloginInfo(res.data.loginInfo);
        })

        axios.post("/personnel/attendanceListBody.do", {
            ...searchKeyword,
            userIdx: loginEmpId,
            pageSize: 5,
            currentPage,
        }).then((res: AxiosResponse<IAttendanceListResponse>) => {
            setAttendanceList(res.data.attendanceList);
            setAttendanceRequestCnt(res.data.attendanceRequestCnt);
            setCPage(currentPage);
            setAttId(res.data.attendanceList[0].attId);
        })
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
                    row.reqStatus === "반려" ?
                        (
                            <StyledButton size="small" onClick={(e) => { handlerrejectReasonModal(row.id, e) }}>
                                반려사유
                            </StyledButton>
                        )
                        : (<>-</>)
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
                                    <AttendanceRequestRejectModal id={id} setId={setId} />
                                )
                        }

                    </Portal>
                )
            }
        </AttendanceRequestMainStyled>
    )
}