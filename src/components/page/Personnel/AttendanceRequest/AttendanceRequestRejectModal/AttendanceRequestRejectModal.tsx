import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import { AttendanceRequestRejectModalStyle } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import axios, { AxiosResponse } from "axios";
import { IAttendance } from "../AttendanceRequestMain/AttendanceRequestMain";

interface AttendanceRequestProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>
}

interface AttendanceRequestRejectResponse {
    detail: IAttendance
}

export const AttendanceRequestRejectModal: FC<AttendanceRequestProps> = ({ id, setId }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [attendanceRequestDetail, setAttendanceRequestDetail] = useState<IAttendance>();

    useEffect(() => {
        id && searchDetail();

        return () => {
            setId(0);
        }
    }, [])

    const searchDetail = () => {
        axios.post("/personnel/attendanceDetailBody.do", { id })
            .then((res: AxiosResponse<AttendanceRequestRejectResponse>) => {
                setAttendanceRequestDetail(res.data.detail);
            })
    }

    return (
        <AttendanceRequestRejectModalStyle>
            <div className='container'>
                <label>
                    결재자
                    <StyledInput type='text' defaultValue={attendanceRequestDetail?.appType} />
                </label>
                <label>
                    반려 사유
                    <textarea defaultValue={attendanceRequestDetail?.appReason} />
                </label>
                <div className={"button-container"}>
                    <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                </div>
            </div>
        </AttendanceRequestRejectModalStyle>
    )
}