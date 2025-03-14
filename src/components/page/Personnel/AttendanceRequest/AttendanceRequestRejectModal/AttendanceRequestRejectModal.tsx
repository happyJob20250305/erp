import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import { AttendanceRequestRejectModalStyle } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { IAttendance } from "../../../../../models/interface/personnel/Attendance/IAttendance";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { AttendanceRequest } from "../../../../../api/api";

interface AttendanceRequestProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>
    setModalType: React.Dispatch<React.SetStateAction<string>>
}

interface AttendanceRequestRejectResponse {
    detail: IAttendance
}

export const AttendanceRequestRejectModal: FC<AttendanceRequestProps> = ({ id, setId, setModalType }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [attendanceRequestDetail, setAttendanceRequestDetail] = useState<IAttendance>();

    useEffect(() => {
        id && searchDetail();

        return () => {
            setId(0);
            setModalType("detail");
        }
    }, [])

    const searchDetail = async () => {
        const result = await searchApi<AttendanceRequestRejectResponse>(AttendanceRequest.searchRejectDetail, { id });

        if (result) {
            setAttendanceRequestDetail(result.detail);
        }
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