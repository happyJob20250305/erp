import { useRecoilState } from "recoil";
import { AttendanceRequestModalStyle } from "./styled"
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { IAttendance } from "../AttendanceRequestMain/AttendanceRequestMain";

interface AttendanceRequestProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>;
}

interface IAttendanceDetail extends IAttendance {
    reqReason: string,
    deptName: string | null,
    reqTel: string
    reqdate: string,
}

interface AttendanceRequestDetailResponse {
    detail: IAttendanceDetail
}

export const AttendanceRequestModal: FC<AttendanceRequestProps> = ({ id, setId }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [attendanceRequestDetail, setAttendanceRequestDetail] = useState<IAttendanceDetail>();

    useEffect(() => {
        id && searchDetail();

        return () => {
            setId(0);
        }
    }, [])

    const searchDetail = () => {
        axios.post("/personnel/attendanceDetailBody.do", { id })
            .then((res: AxiosResponse<AttendanceRequestDetailResponse>) => {
                setAttendanceRequestDetail(res.data.detail);
            })
    }

    return (
        <AttendanceRequestModalStyle>
            <div className='container'>
                <form>
                    <label>
                        근무부서
                        <StyledInput type='text' name="deptName" defaultValue={attendanceRequestDetail?.deptName} />
                    </label>
                    <label>
                        성명
                        <StyledInput type='text' name="name" defaultValue={attendanceRequestDetail?.name} />
                    </label>
                    <label>
                        사번
                        <StyledInput type='text' name="number" defaultValue={attendanceRequestDetail?.number} />
                    </label>
                    <label>
                        연/반차*
                        <StyledInput type='text' name="number" defaultValue={attendanceRequestDetail?.reqType} />
                    </label>
                    <label>
                        기간*
                        <div className="input-date">
                            <StyledInput type='date' fullWidth={true} defaultValue={attendanceRequestDetail?.reqSt} />
                            <span>~</span>
                            <StyledInput type='date' fullWidth={true} defaultValue={attendanceRequestDetail?.reqEd} />
                        </div>
                    </label>
                    <label>
                        신청사유*
                        <textarea name="number" defaultValue={attendanceRequestDetail?.reqReason} />
                    </label>
                    <label>
                        비상연락처*
                        <StyledInput type='text' name="number" defaultValue={attendanceRequestDetail?.reqTel} />
                    </label>
                    <label>
                        신청일
                        <StyledInput type='text' name="number" defaultValue={attendanceRequestDetail?.reqdate} />
                    </label>
                    <div className={"button-container"}>
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </AttendanceRequestModalStyle>
    )
}