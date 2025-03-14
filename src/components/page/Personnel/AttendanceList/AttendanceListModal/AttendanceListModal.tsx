import { FC, useEffect, useState } from "react"
import { AttendanceListModalStyled } from "./styled";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { IAttendance } from "../../../../../models/interface/personnel/attendance/IAttendance";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { AttendanceList } from "../../../../../api/api";

interface AttendanceRequestProps {
    reqStatus: string,
    searchStDate: string
}

interface AttendanceRequestDetailResponse {
    attendanceList: IAttendance[]
}

export const AttendanceListModal: FC<AttendanceRequestProps> = ({ reqStatus, searchStDate }) => {
    const [attendanceDetail, setAttendanceDetail] = useState<IAttendance[]>();
    const [modal, setModal] = useRecoilState<Boolean>(modalState);

    const columns = [
        { key: "deptName", title: "번호" },
        { key: "name", title: "사원명" },
        { key: "reqType", title: "신청구분" },
    ] as Column<IAttendance>[];

    useEffect(() => {
        reqStatus && searchDetail();
    }, [])

    const searchDetail = async () => {
        const result = await searchApi<AttendanceRequestDetailResponse>(AttendanceList.searchDetail, {
            searchStDate: searchStDate,
            req_status: reqStatus
        })

        if (result) {
            setAttendanceDetail(result.attendanceList);
        }
    }

    return (
        <AttendanceListModalStyled>
            <div className='container'>
                <form>
                    <StyledTable
                        columns={columns}
                        data={attendanceDetail}
                        fullWidth={true}
                    />
                    <div className={"button-container"}>
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </AttendanceListModalStyled>
    )
}