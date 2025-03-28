import { useRecoilState } from "recoil";
import { AttendanceApprovalModalStyle } from "./styled"
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { nullCheck } from "../../../../../common/nullCheck";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { AttendanceApproval } from "../../../../../api/api";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { IAttendanceDetail } from "../../../../../models/interface/personnel/attendance/IAttendanceDetail";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";

interface AttendanceApprovalProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>,
    postSuccess: () => void,
}

interface AttendanceApprovalDetailResponse {
    detail: IAttendanceDetail
}

export const AttendanceApprovalModal: FC<AttendanceApprovalProps> = ({ id, setId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [attendanceApprovalDetail, setAttendanceApprovalDetail] = useState<IAttendanceDetail>();
    const formRef = useRef<HTMLFormElement>(null);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);

    useEffect(() => {
        id && searchDetail();

        return () => {
            setId(0);
        }
    }, [])

    const searchDetail = async () => {
        const result = await searchApi<AttendanceApprovalDetailResponse>(AttendanceApproval.searchDetail, { id });

        if (result) {
            setAttendanceApprovalDetail(result.detail);
        }
    }

    const rejectAttendance = async () => {
        const formData = new FormData(formRef.current);

        if (!nullCheck([
            { inval: formData.get("appReason").toString(), msg: "반려 사유를 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(AttendanceApproval.rejectAttendance, {
            reqId: id,
            userIdx: userInfo.empId,
            appReason: formData.get("appReason").toString()
        })

        if (result.result === "success") {
            alert("반려되었습니다.");
            postSuccess();
        }
    }

    const firstApproveAttendance = async () => {
        const result = await postApi<IPostResponse>(AttendanceApproval.firstApproveAttendance, {
            reqId: id,
            userIdx: userInfo.empId,
        })

        if (result.result === "success") {
            alert("승인되었습니다.");
            postSuccess();
        }
    }

    const approveRejectAttendance = async (attAppId: number) => {
        const formData = new FormData(formRef.current);

        if (!nullCheck([
            { inval: formData.get("appReason").toString(), msg: "반려 사유를 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(AttendanceApproval.approveRejectAttendance, {
            id: attAppId,
            reqId: id,
            userIdx: userInfo.empId,
            appReason: formData.get("appReason").toString()
        })

        if (result.result === "success") {
            alert("반려되었습니다.");
            postSuccess();
        }
    }

    const secondApproveAttendance = async () => {
        const result = await postApi<IPostResponse>(AttendanceApproval.secondApproveAttendance, {
            reqId: id,
            userIdx: userInfo.empId,
        })

        if (result.result === "success") {
            alert("승인되었습니다.");
            postSuccess();
        }
    }

    return (
        <AttendanceApprovalModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        근무부서
                        <StyledInput type='text' name="deptName" variant="disable"
                            defaultValue={attendanceApprovalDetail?.deptName} readOnly />
                    </label>
                    <label>
                        성명
                        <StyledInput type='text' name="name" variant="disable"
                            defaultValue={attendanceApprovalDetail?.name} readOnly />
                    </label>
                    <label>
                        사번
                        <StyledInput type='text' name="number" variant="disable"
                            defaultValue={attendanceApprovalDetail?.number} readOnly />
                    </label>
                    <label>
                        연/반차
                        <StyledInput type='text' name="reqType" variant="disable"
                            defaultValue={attendanceApprovalDetail?.reqType} readOnly />
                    </label>
                    <label>
                        기간
                        <div className="input-date">
                            <StyledInput type='date' name="reqSt" fullWidth={true} variant="disable"
                                defaultValue={attendanceApprovalDetail?.reqSt} readOnly />
                            <span>~</span>
                            <StyledInput type='date' name="reqEd" fullWidth={true} variant="disable"
                                defaultValue={attendanceApprovalDetail?.reqEd} readOnly />
                        </div>
                    </label>
                    <label>
                        신청사유
                        <textarea name="reqReason" disabled={true} defaultValue={attendanceApprovalDetail?.reqReason} readOnly />
                    </label>
                    <label>
                        반려사유*
                        <textarea name="appReason" defaultValue={attendanceApprovalDetail?.appReason} />
                    </label>
                    <label>
                        비상연락처
                        <StyledInput type='text' name="reqTel" variant="disable"
                            defaultValue={attendanceApprovalDetail?.reqTel} readOnly />
                    </label>
                    <label>
                        신청일
                        <StyledInput type='text' name="reqdate" variant="disable"
                            defaultValue={attendanceApprovalDetail?.reqdate} readOnly />
                    </label>
                    <div className={"button-container"}>
                        {
                            (userInfo.userType === "A" && (attendanceApprovalDetail?.reqStatus === "검토 대기"))
                            && <button type='button' onClick={firstApproveAttendance}>승인</button>
                        }
                        {
                            (userInfo.userType === "C" && (attendanceApprovalDetail?.reqStatus === "승인 대기"))
                            && <button type='button' onClick={secondApproveAttendance}>승인</button>
                        }
                        {
                            (userInfo.userType === "A" && ((attendanceApprovalDetail?.reqStatus === "검토 대기")))
                            && <button type='button' onClick={rejectAttendance}>반려</button>
                        }
                        {
                            ((userInfo.userType === "A" && (attendanceApprovalDetail?.reqStatus === "승인 대기"))
                                || (userInfo.userType === "C" && (attendanceApprovalDetail?.reqStatus === "승인 대기")))
                            && <button type='button' onClick={() => { approveRejectAttendance(attendanceApprovalDetail?.attAppId) }}>반려</button>
                        }
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </AttendanceApprovalModalStyle>
    )
}