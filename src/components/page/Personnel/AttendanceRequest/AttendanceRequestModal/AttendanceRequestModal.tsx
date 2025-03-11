import { useRecoilState } from "recoil";
import { AttendanceRequestModalStyle } from "./styled"
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { IAttendance, IloginInfo } from "../AttendanceRequestMain/AttendanceRequestMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";

interface AttendanceRequestProps {
    id: number,
    setId: React.Dispatch<React.SetStateAction<number>>;
    loginInfo: IloginInfo
    attId: number;
    postSuccess: () => void;
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

export const AttendanceRequestModal: FC<AttendanceRequestProps> = ({ id, setId, loginInfo, attId, postSuccess }) => {
    const loginUserInfo = sessionStorage.getItem("userInfo");
    const loginEmpid = JSON.parse(loginUserInfo).empId;

    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [attendanceRequestDetail, setAttendanceRequestDetail] = useState<IAttendanceDetail>();
    const [selectReqTypeValue, setSelectReqTypeValue] = useState<string>("연차");
    const formRef = useRef<HTMLFormElement>(null);

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;

    const optionsReqType = [
        { label: "연차", value: "연차" },
        { label: "반차", value: "반차" }
    ]

    useEffect(() => {
        id && searchDetail();
        id || setDetail();

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

    const setDetail = () => {
        console.log(attId);
    }

    const saveAttendanceRequest = () => {
        const formData = new FormData(formRef.current);
        formData.append("attId", attId.toString());
        formData.append("empId", loginEmpid);

        var stDate = new Date(formData.get("reqSt").toString());
        var edDate = new Date(formData.get("reqEd").toString());
        var reqDay = (edDate.getTime() - stDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

        formData.append("reqDay", reqDay.toString());
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
                                    <StyledInput type='text' defaultValue={attendanceRequestDetail?.reqType} readOnly />
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
                                    <button type='button' onClick={saveAttendanceRequest}>저장</button>
                                </>)
                        }
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </AttendanceRequestModalStyle>
    )
}