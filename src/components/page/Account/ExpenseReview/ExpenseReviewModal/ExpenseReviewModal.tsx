import { useRecoilState, useRecoilValue } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ExpenseReviewModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import { ISetListOption } from "../../Manage/ManageSearch.tsx/ManageSearch";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import axios, { AxiosResponse } from "axios";
import { IExpenseReview } from "../ExpenseReviewMain/ExpenseReviewMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { Ratio } from "react-bootstrap";

interface IExpenseReviewModalProps {
    expenseDetail?: IExpenseReview;
    postSuccess: () => void;
    setExpenseDetail: (expenseDetail?: IExpenseReview) => void;
}

interface ICrebitList {
    detail_code: string;
    detail_name: string;
}

interface IExpenseReviewBody {
    crebitList: ICrebitList[];
}

interface IPostResponse {
    result: string;
}
export const ExpenseReviewModal: FC<IExpenseReviewModalProps> = ({ expenseDetail, postSuccess, setExpenseDetail }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const formRef = useRef<HTMLFormElement>(null);
    const [crebitList, setCrebitList] = useState<ISetListOption[]>([]);
    const [selectedCrebitDetail, setSelectedCrebitDetail] = useState<string>("");
    const [selectedApproval, setSelectedApproval] = useState("F");

    useEffect(() => {
        getCrebitList();
        return () => {
            setExpenseDetail();
        };
    }, [expenseDetail]);

    const getCrebitList = () => {
        axios.post("/account/expense-reviewBody.do", {}).then((res: AxiosResponse<IExpenseReviewBody>) => {
            const searchCrebitList: ISetListOption[] = [
                ...res.data.crebitList.map((detail: ICrebitList) => ({
                    label: detail.detail_name,
                    value: detail.detail_code,
                })),
            ];
            setCrebitList(searchCrebitList);
        });
    };

    const expenseUpdate = () => {
        const formData = new FormData(formRef.current);
        formData.append("exp_id", expenseDetail.id.toString());
        axios.post("/account/expenseUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다.");
                postSuccess();
            }
        });
    };

    const expensefileDownload = () => {
        const param = new URLSearchParams();
        param.append("expenseSeq", expenseDetail?.id.toString());
        axios.post("/account/expenseDownload.do", param, { responseType: "blob" }).then((res: AxiosResponse<Blob>) => {
            const url = window.URL.createObjectURL(res.data);
            const link = document.createElement("a");
            link.href = url;
            console.log(expenseDetail);
            link.setAttribute("download", expenseDetail.file_name as string);
            document.body.appendChild(link);
            link.click();

            //브라우저에서 a태그 삭제
            document.body.removeChild(link);
            //삭제
            window.URL.revokeObjectURL(url);
        });
    };

    const approvalCode = (status: string) => {
        switch (status) {
            case "W":
                return "검토 대기";
            case "N":
                return "반려";
            case "F":
                return "승인 대기";
            case "S":
                return "승인";
        }
    };
    return (
        <ExpenseReviewModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <table className='row'>
                        <tbody>
                            <tr>
                                <th>결의번호</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_id'
                                        defaultValue={expenseDetail?.id}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th>신청일자</th>
                                <td>
                                    <StyledInput
                                        type='date'
                                        name='request_date'
                                        defaultValue={expenseDetail?.req_date}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th>사용일자</th>
                                <td>
                                    <StyledInput
                                        type='date'
                                        name='use_date'
                                        defaultValue={expenseDetail?.use_date}
                                        disabled
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th>사번</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_no'
                                        defaultValue={expenseDetail?.emp_no}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th>사원명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={expenseDetail?.name}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th>사용부서</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='use_dept'
                                        defaultValue={expenseDetail?.use_department}
                                        disabled
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th>계정대분류명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='accountGroup'
                                        defaultValue={expenseDetail?.group_name}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th>계정과목 </th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='accountDetail'
                                        defaultValue={expenseDetail?.detail_name}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th>거래처명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='clientId'
                                        defaultValue={expenseDetail?.client_name}
                                        disabled
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th>결의금액</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_pay'
                                        defaultValue={expenseDetail?.expense_payment}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th>승인여부</th>
                                <td>
                                    {expenseDetail.is_approval == "W" ? (
                                        <>
                                            <input
                                                type='radio'
                                                name='checkApproval'
                                                value='F'
                                                checked={selectedApproval === "F"}
                                                onChange={() => setSelectedApproval("F")}
                                            />{" "}
                                            검토완료
                                            <input
                                                type='radio'
                                                name='checkApproval'
                                                value='N'
                                                checked={selectedApproval === "N"}
                                                onChange={() => setSelectedApproval("N")}
                                            />{" "}
                                            반려
                                        </>
                                    ) : (
                                        <StyledInput
                                            type='text'
                                            name='isApproval'
                                            defaultValue={approvalCode(expenseDetail?.is_approval)}
                                            disabled
                                        ></StyledInput>
                                    )}
                                </td>
                                <th>승인일자</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='approval_date'
                                        defaultValue={expenseDetail?.approval_date}
                                        disabled
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                {!expenseDetail ? (
                                    <td>
                                        <input type='file' className='inputTxt p100' name='fileInput' id='fileInput' />
                                    </td>
                                ) : (
                                    <td>
                                        <div onClick={expensefileDownload}>
                                            <label>다운로드</label>
                                        </div>
                                    </td>
                                )}
                                <th>대변 계정과목</th>
                                <td>
                                    <StyledSelectBox
                                        name='crebitDetail'
                                        options={crebitList}
                                        value={selectedCrebitDetail}
                                        onChange={setSelectedCrebitDetail}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>비고</th>
                                <td colSpan={10}>
                                    <textarea
                                        name='expenseContent'
                                        id='content'
                                        defaultValue={expenseDetail?.expense_content}
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={"button-container"}>
                        {expenseDetail.is_approval == "W" && (
                            <StyledButton type='button' onClick={expenseUpdate}>
                                검토완료
                            </StyledButton>
                        )}

                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                </form>
            </div>
        </ExpenseReviewModalStyle>
    );
};
