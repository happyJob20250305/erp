import { FC, useEffect, useRef, useState } from "react";
import { ExpenseApprovalModalStyle } from "./styled";
import { IExpenseReview } from "../../ExpenseReview/ExpenseReviewMain/ExpenseReviewMain";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { ButtonArea, ModalStyledTable } from "../../VoucherList/VoucherListModal/styled";

interface IExpenseApprovalModalProps {
    expenseDetail?: IExpenseReview;
    postSuccess: () => void;
    setExpenseDetail: (expenseDetail?: IExpenseReview) => void;
}
interface IPostResponse {
    result: string;
}
export const ExpenseApprovalModal: FC<IExpenseApprovalModalProps> = ({
    expenseDetail,
    postSuccess,
    setExpenseDetail,
}) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedApproval, setSelectedApproval] = useState("S");

    useEffect(() => {
        return () => {
            setExpenseDetail();
        };
    }, [expenseDetail]);

    const expenseLastUpdate = () => {
        const formData = new FormData(formRef.current);
        formData.append("exp_id", expenseDetail.id.toString());
        axios.post("/account/expenseLastUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
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
        <ExpenseApprovalModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <ModalStyledTable>
                        <tbody>
                            <tr>
                                <th scope='row'>결의번호</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_id'
                                        defaultValue={expenseDetail?.id}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th scope='row'>신청일자</th>
                                <td>
                                    <StyledInput
                                        type='date'
                                        name='request_date'
                                        defaultValue={expenseDetail?.req_date}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th scope='row'>
                                    사용일자 <span className='font_red'>*</span>
                                </th>
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
                                <th scope='row'>사번</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_no'
                                        defaultValue={expenseDetail?.emp_no}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th scope='row'>사원명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={expenseDetail?.name}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th scope='row'>사용부서</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='use_dept'
                                        defaultValue={expenseDetail?.use_department}
                                        disabled
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr id='writer'>
                                <th scope='row'>
                                    계정대분류명 <span className='font_red'>*</span>
                                </th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='accountGroup'
                                        defaultValue={expenseDetail?.group_name}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th scope='row'>
                                    계정과목 <span className='font_red'>*</span>
                                </th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='accountDetail'
                                        defaultValue={expenseDetail?.detail_name}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th scope='row'>거래처명</th>
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
                                <th scope='row'>결의금액</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_pay'
                                        defaultValue={expenseDetail?.expense_payment}
                                        disabled
                                    ></StyledInput>
                                </td>
                                <th scope='row'>승인여부</th>
                                <td>
                                    {expenseDetail.is_approval == "F" ? (
                                        <>
                                            <input
                                                type='radio'
                                                name='checkApproval'
                                                value='S'
                                                checked={selectedApproval === "S"}
                                                onChange={() => setSelectedApproval("S")}
                                            />{" "}
                                            승인
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
                                <th scope='row'>승인일자</th>
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
                                <th scope='row'>첨부파일</th>

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
                                {expenseDetail.crebit_code ? (
                                    <>
                                        <th scope='row'>대변 계정과목</th>
                                        <td>
                                            <StyledInput
                                                type='text'
                                                name='crebitDetail'
                                                defaultValue={expenseDetail?.crebit_name}
                                                disabled
                                            ></StyledInput>
                                        </td>
                                    </>
                                ) : null}
                            </tr>
                            <tr>
                                <th scope='row'>비고</th>
                                <td colSpan={10}>
                                    <textarea
                                        name='expenseContent'
                                        id='content'
                                        defaultValue={expenseDetail?.expense_content}
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </ModalStyledTable>

                    <ButtonArea>
                        {expenseDetail.is_approval == "F" && (
                            <StyledButton type='button' onClick={expenseLastUpdate}>
                                승인
                            </StyledButton>
                        )}

                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </ButtonArea>
                </form>
            </div>
        </ExpenseApprovalModalStyle>
    );
};
