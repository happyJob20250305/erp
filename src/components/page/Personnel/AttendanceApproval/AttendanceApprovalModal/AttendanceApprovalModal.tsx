import { useRecoilState } from "recoil";
import { AttendanceApprovalModalStyle } from "./styled"
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IAttendance } from "../AttendanceApprovalMain/AttendanceApprovalMain";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";

interface AttendanceApprovalProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>,
}

interface IAttendanceDetail extends IAttendance {
    reqReason: string,
    deptName: string | null,
    reqTel: string
    reqdate: string,
}

interface AttendanceApprovalDetailResponse {
    detail: IAttendanceDetail
}

export const AttendanceApprovalModal: FC<AttendanceApprovalProps> = ({ id, setId }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [attendanceApprovalDetail, setAttendanceApprovalDetail] = useState<IAttendanceDetail>();

    useEffect(() => {
        id && searchDetail();

        return () => {
            setId(0);
        }
    }, [])

    const searchDetail = () => {
        axios.post("/personnel/attendanceDetailBody.do", { id })
            .then((res: AxiosResponse<AttendanceApprovalDetailResponse>) => {
                setAttendanceApprovalDetail(res.data.detail);
            })
    }

    return (
        <AttendanceApprovalModalStyle>
            <div className='container'>
                <form>
                    <label>
                        근무부서
                        <StyledInput type='text' name="deptName" defaultValue={attendanceApprovalDetail?.deptName} readOnly />
                    </label>
                    <label>
                        성명
                        <StyledInput type='text' name="name" defaultValue={attendanceApprovalDetail?.name} readOnly />
                    </label>
                    <label>
                        사번
                        <StyledInput type='text' name="number" defaultValue={attendanceApprovalDetail?.number} readOnly />
                    </label>
                    <label>
                        연/반차
                        <StyledInput type='text' name="reqType" defaultValue={attendanceApprovalDetail?.reqType} readOnly />
                    </label>
                    <label>
                        기간
                        <div className="input-date">
                            <StyledInput type='date' name="reqSt" fullWidth={true} defaultValue={attendanceApprovalDetail?.reqSt} readOnly />
                            <span>~</span>
                            <StyledInput type='date' name="reqEd" fullWidth={true} defaultValue={attendanceApprovalDetail?.reqEd} readOnly />
                        </div>
                    </label>
                    <label>
                        신청사유
                        <textarea name="reqReason" defaultValue={attendanceApprovalDetail?.reqReason} readOnly />
                    </label>
                    <label>
                        승인/반려 사유
                        <textarea name="appReason" defaultValue={attendanceApprovalDetail?.appReason} />
                    </label>
                    <label>
                        비상연락처
                        <StyledInput type='text' name="reqTel" defaultValue={attendanceApprovalDetail?.reqTel} readOnly />
                    </label>
                    <label>
                        신청일
                        <StyledInput type='text' name="reqdate" defaultValue={attendanceApprovalDetail?.reqdate} readOnly />
                    </label>
                    <div className={"button-container"}>
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </AttendanceApprovalModalStyle>
    )
}