import { useRecoilState } from "recoil";
import { AttendanceRequestModalStyle } from "./styled"
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { nullCheck } from "../../../../../common/nullCheck";
import { IAttendanceCnt, ILoginUserInfo } from "../../../../../models/interface/personnel/attendance/IAttendanceCnt";
import { IAttendanceDetail } from "../../../../../models/interface/personnel/attendance/IAttendanceDetail";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { AttendanceRequest } from "../../../../../api/api";
import { postApi } from "../../../../../api/PersonnelApi/postApi";

interface AttendanceRequestProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>,
    loginInfo: ILoginUserInfo,
    attId: number,
    attendanceCnt: IAttendanceCnt[],
    postSuccess: () => void
}

interface AttendanceRequestDetailResponse {
    detail: IAttendanceDetail
}

export const AttendanceRequestModal: FC<AttendanceRequestProps> = ({ id, setId, loginInfo, attId, attendanceCnt, postSuccess }) => {
    const loginUserInfo = sessionStorage.getItem("userInfo");
    const loginEmpid = JSON.parse(loginUserInfo).empId;

    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [attendanceRequestDetail, setAttendanceRequestDetail] = useState<IAttendanceDetail>();
    const [selectReqTypeValue, setSelectReqTypeValue] = useState<string>("연차");
    const formRef = useRef<HTMLFormElement>(null);

    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;

    const optionsReqType = [
        { label: "연차", value: "연차" },
        { label: "반차", value: "반차" }
    ]

    useEffect(() => {
        id && searchDetail();

        return () => {
            setId(0);
        }
    }, [])

    const searchDetail = async () => {
        const result = await searchApi<AttendanceRequestDetailResponse>(AttendanceRequest.searchDetail, { id });

        if (result) {
            setAttendanceRequestDetail(result.detail);
        }

    }

    const saveAttendanceRequest = async () => {
        const formData = new FormData(formRef.current);
        formData.append("attId", attId.toString());
        formData.append("empId", loginEmpid);

        let reqDay = calReqday();
        formData.append("reqDay", reqDay.toString());

        if (!checkValidateAttendanceRequest(reqDay)) { return false; }

        const result = await postApi<IPostResponse>(AttendanceRequest.saveAttendanceRequest, formData);

        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        } else if (result.result === "fail") {
            alert("이미 신청된 날짜입니다");
        }
    }

    const updateAttendanceRequest = async () => {
        const formData = new FormData(formRef.current);
        formData.append("reqId", id.toString());

        let reqDay = calReqday().toString();
        formData.append("reqDay", reqDay);

        if (!checkValidateAttendanceRequest(reqDay)) { return false; }

        const result = await postApi<IPostResponse>(AttendanceRequest.updateAttendanceRequest, formData);

        if (result.result === "success") {
            alert("수정되었습니다.");
            postSuccess();
        }
    }

    const cancleAttendanceRequest = async () => {
        const result = await postApi<IPostResponse>(AttendanceRequest.cancleAttendanceRequest, { reqId: id });

        if (result.result === "success") {
            alert("취소되었습니다.");
            postSuccess();
        }
    }

    const calReqday = () => {
        const formData = new FormData(formRef.current);

        let reqDay = 0.5;
        if (formData.get("reqType").toString() === "연차") {
            let stDate = new Date(formData.get("reqSt").toString());
            let edDate = new Date(formData.get("reqEd").toString());
            reqDay = (edDate.getTime() - stDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

            let weekends = 0;
            let tempDate = new Date(stDate);
            while (tempDate <= edDate) {
                if (tempDate.getDay() === 6 || tempDate.getDay() === 0) {
                    weekends++;
                }
                tempDate.setDate(tempDate.getDate() + 1);
            }
            reqDay -= weekends;
        }
        return reqDay;
    }

    const checkValidateAttendanceRequest = (reqDay) => {
        const formData = new FormData(formRef.current);

        let reqType = formData.get("reqType");
        let reqSt = formData.get("reqSt");
        let reqEd = formData.get("reqEd");
        let stDate = new Date(reqSt.toString());
        let edDate = new Date(reqEd.toString());
        let reqTel = formData.get("reqTel");

        const phoneRules = /^\d{3}-\d{4}-\d{4}$/;

        if (!nullCheck([
            { inval: formData.get("reqSt").toString(), msg: "시작일을 입력해주세요." },
            { inval: formData.get("reqEd").toString(), msg: "종료일을 입력해주세요." },
            { inval: formData.get("reqReason").toString(), msg: "신청사유를 입력해주세요." },
            { inval: formData.get("reqTel").toString(), msg: "비상연락처를 입력해주세요." }
        ])) { return false; }

        if (reqSt > reqEd) {
            alert("시작일이 종료일보다 나중일 수 없습니다.");
            return false;
        }
        if (reqDay > attendanceCnt[0].leftAttCnt) {
            alert("신청 가능한 연차 일수가 부족합니다.");
            return false;
        }
        if (stDate.getDay() === 6 || stDate.getDay() === 0 || edDate.getDay() === 6 || edDate.getDay() === 0) {
            alert("주말에는 신청할 수 없습니다.");
            return false;
        }
        if (reqType === "반차" && reqSt !== reqEd) {
            alert("반차 신청은 같은 날짜만 선택 가능합니다.");
            return false;
        }

        if (!phoneRules.test(reqTel.toString())) {
            alert("전화번호 형식을 확인해주세요.");
            return false;
        }
        return true;
    }

    return (
        <AttendanceRequestModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        근무부서
                        <StyledInput type='text' name="deptName" disabled={true}
                            defaultValue={id ? attendanceRequestDetail?.deptName : loginInfo?.detail_name} readOnly />
                    </label>
                    <label>
                        성명
                        <StyledInput type='text' name="name" disabled={true}
                            defaultValue={id ? attendanceRequestDetail?.name : loginInfo?.usr_nm} readOnly />
                    </label>
                    <label>
                        사번
                        <StyledInput type='text' name="number" disabled={true}
                            defaultValue={id ? attendanceRequestDetail?.number : loginInfo?.usr_idx} readOnly />
                    </label>
                    <label>
                        연/반차*
                        {
                            id ?
                                (
                                    <StyledInput type='text' name="reqType" disabled={true}
                                        defaultValue={attendanceRequestDetail?.reqType} readOnly />
                                )
                                :
                                (
                                    <StyledSelectBox
                                        name="reqType"
                                        options={optionsReqType}
                                        value={selectReqTypeValue}
                                        onChange={setSelectReqTypeValue}
                                    />
                                )
                        }
                    </label>
                    <label>
                        기간*
                        <div className="input-date">
                            <StyledInput type='date' name="reqSt" fullWidth={true} defaultValue={attendanceRequestDetail?.reqSt} />
                            <span>~</span>
                            <StyledInput type='date' name="reqEd" fullWidth={true} defaultValue={attendanceRequestDetail?.reqEd} />
                        </div>
                    </label>
                    <label>
                        신청사유*
                        <textarea name="reqReason" defaultValue={attendanceRequestDetail?.reqReason} />
                    </label>
                    <label>
                        비상연락처*
                        <StyledInput type='text' name="reqTel" placeholder="010-1234-4567"
                            defaultValue={attendanceRequestDetail?.reqTel} />
                    </label>
                    <label>
                        신청일
                        <StyledInput type='text' name="reqdate" disabled={true}
                            defaultValue={id ? attendanceRequestDetail?.reqdate : dateString} readOnly />
                    </label>
                    <div className={"button-container"}>
                        {
                            id ?
                                (<>
                                    {
                                        attendanceRequestDetail?.reqStatus === "검토 대기"
                                        && (<button type='button' onClick={updateAttendanceRequest}>수정</button>)
                                    }
                                    {
                                        (attendanceRequestDetail?.reqStatus === "반려"
                                            || attendanceRequestDetail?.reqStatus === "취소")
                                        || (<button type='button' onClick={cancleAttendanceRequest}>신청취소</button>)
                                    }
                                </>)
                                :
                                (
                                    <button type='button' onClick={saveAttendanceRequest}>신청</button>
                                )
                        }
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </AttendanceRequestModalStyle>
    )
}