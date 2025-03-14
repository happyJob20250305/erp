import { FC, useEffect, useState } from "react"
import { AttendanceListModalStyled } from "./styled";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { IAttendance } from "../AttendanceListMain/AttendanceListMain";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

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

    const searchDetail = () => {
        axios.post("/personnel/approveDetailListBody.do", {
            searchStDate: searchStDate,
            req_status: reqStatus
        }).then((res: AxiosResponse<AttendanceRequestDetailResponse>) => {
            setAttendanceDetail(res.data.attendanceList);
        })
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