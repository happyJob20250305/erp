import { useRecoilState } from "recoil";
import { AttendanceRequestModalStyle } from "./styled"
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { IAttendance, IAttendanceCnt, IloginInfo } from "../AttendanceRequestMain/AttendanceRequestMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { nullCheck } from "../../../../../common/nullCheck";

interface AttendanceRequestProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>,
    loginInfo: IloginInfo,
    attId: number,
    attendanceCnt: IAttendanceCnt[],
    postSuccess: () => void
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

interface IPostResponse {
    result: string
    message?: string
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

    const searchDetail = () => {
        axios.post("/personnel/attendanceDetailBody.do", { id })
            .then((res: AxiosResponse<AttendanceRequestDetailResponse>) => {
                setAttendanceRequestDetail(res.data.detail);
            })
    }

    const saveAttendanceRequest = () => {
        const formData = new FormData(formRef.current);
        formData.append("attId", attId.toString());
        formData.append("empId", loginEmpid);

        let reqDay = calReqday();
        formData.append("reqDay", reqDay.toString());

        if (!checkValidateAttendanceRequest(reqDay)) { return false; }

        axios.post("/personnel/attendanceRequest.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다.");
                postSuccess();
            } else if (res.data.result === "fail") {
                alert("이미 신청된 날짜입니다");
            }
        })
    }

    const updateAttendanceRequest = () => {
        const formData = new FormData(formRef.current);
        formData.append("reqId", id.toString());

        let reqDay = calReqday().toString();
        formData.append("reqDay", reqDay);

        if (!checkValidateAttendanceRequest(reqDay)) { return false; }

        axios.post("/personnel//attendanceUpdate.do", formData)
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("수정되었습니다.");
                    postSuccess();
                }
            })
    }

    const cancleAttendanceRequest = () => {
        axios.post("/personnel/attendanceCancleBody.do", { reqId: id })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("취소되었습니다.");
                    postSuccess();
                }
            })
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
                        <StyledInput type='text' name="deptName" defaultValue={id ? attendanceRequestDetail?.deptName : loginInfo?.detail_name} readOnly />
                    </label>
                    <label>
                        성명
                        <StyledInput type='text' name="name" defaultValue={id ? attendanceRequestDetail?.name : loginInfo?.usr_nm} readOnly />
                    </label>
                    <label>
                        사번
                        <StyledInput type='text' name="number" defaultValue={id ? attendanceRequestDetail?.number : loginInfo?.usr_idx} readOnly />
                    </label>
                    <label>
                        연/반차*
                        {
                            id ?
                                (<>
                                    <StyledInput type='text' name="reqType" defaultValue={attendanceRequestDetail?.reqType} readOnly />
                                </>)
                                :
                                (<>
                                    <StyledSelectBox
                                        name="reqType"
                                        options={optionsReqType}
                                        value={selectReqTypeValue}
                                        onChange={setSelectReqTypeValue}
                                    />
                                </>)
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
                        <StyledInput type='text' name="reqTel" defaultValue={attendanceRequestDetail?.reqTel} />
                    </label>
                    <label>
                        신청일
                        <StyledInput type='text' name="reqdate" defaultValue={id ? attendanceRequestDetail?.reqdate : dateString} readOnly />
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
                                (<>
                                    <button type='button' onClick={saveAttendanceRequest}>신청</button>
                                </>)
                        }
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </AttendanceRequestModalStyle>
    )
}