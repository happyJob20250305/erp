import { useContext, useEffect, useState } from "react"
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { AttendanceApprovalMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { AttendanceContext } from "../../../../../api/Provider/AttendanceProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { AttendanceApprovalModal } from "../AttendanceApprovalModal/AttendanceApprovalModal";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { AttendanceApproval } from "../../../../../api/api";
import { IAttendance } from "../../../../../models/interface/personnel/attendance/IAttendance";
interface IAttendanceListResponse {
    attendanceList: IAttendance[],
    attendanceRequestCnt: number
}

export const AttendanceApprovalMain = () => {
    const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
    const [attendanceRequestCnt, setAttendanceRequestCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const { searchKeyword } = useContext(AttendanceContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [id, setId] = useState<number>(0);

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
    }, [searchKeyword])

    const searchAttendanceList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IAttendanceListResponse>(AttendanceApproval.searchAttendanceList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        })

        if (result) {
            setAttendanceList(result.attendanceList);
            setAttendanceRequestCnt(result.attendanceRequestCnt);
            setCPage(currentPage);
        }
    }

    const handlerModal = (id: number) => {
        setId(id);
        setModal(!modal);
    }

    const postSuccess = () => {
        setModal(!modal);
        searchAttendanceList();
    }

    return (
        <AttendanceApprovalMainStyled>
            <StyledTable
                columns={columns}
                data={attendanceList}
                hoverable={true}
                fullWidth={true}
                onCellClick={(row, columns) => {
                    handlerModal(row.id);
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
                        <AttendanceApprovalModal id={id} setId={setId} postSuccess={postSuccess} />
                    </Portal>
                )
            }
        </AttendanceApprovalMainStyled>
    )
}