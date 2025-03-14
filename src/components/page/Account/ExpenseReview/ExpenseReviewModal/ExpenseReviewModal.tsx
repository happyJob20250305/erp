import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ExpenseReviewModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ButtonArea, ModalStyledTable } from "../../VoucherList/VoucherListModal/styled";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { IExpenseReview } from "../../../../../models/interface/account/expenseReview/IExpenseReview";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { ICrebitList, IExpenseReviewBody } from "../../../../../models/interface/account/groupList/IAccountGroup";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { ExpenseReview } from "../../../../../api/api";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { accountPostApi } from "../../../../../api/AccountApi/accountPostApi";
import { approvalCode } from "../../../../../common/approvalStatus";

interface IExpenseReviewModalProps {
    expenseDetail?: IExpenseReview;
    postSuccess: () => void;
    setExpenseDetail: (expenseDetail?: IExpenseReview) => void;
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

    const getCrebitList = async () => {
        const result = await accountSearchApi<IExpenseReviewBody>(ExpenseReview.getCrebitList, {});
        if (result) {
            setCrebitList(setSelectOption(result.crebitList, "detail_name", "detail_code"));
        }
    };

    const expenseUpdate = async () => {
        const formData = new FormData(formRef.current);
        formData.append("exp_id", expenseDetail.id.toString());
        const result = await accountPostApi<IPostResponse>(ExpenseReview.expenseUpdate, formData);
        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        }
    };

    const expensefileDownload = async () => {
        const param = new URLSearchParams();
        param.append("expenseSeq", expenseDetail?.id.toString());
        const result = await accountPostApi<Blob>(ExpenseReview.expensefileDownload, param, { responseType: "blob" });
        if (result) {
            const url = window.URL.createObjectURL(result);
            const link = document.createElement("a");
            link.href = url;
            console.log(expenseDetail);
            link.setAttribute("download", expenseDetail.file_name as string);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    };

    return (
        <ExpenseReviewModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <ModalStyledTable>
                        <tbody>
                            <tr>
                                <th>결의번호</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_id'
                                        defaultValue={expenseDetail?.id}
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th>신청일자</th>
                                <td>
                                    <StyledInput
                                        type='date'
                                        name='request_date'
                                        defaultValue={expenseDetail?.req_date}
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th>사용일자</th>
                                <td>
                                    <StyledInput
                                        type='date'
                                        name='use_date'
                                        defaultValue={expenseDetail?.use_date}
                                        readOnly
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
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th>사원명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={expenseDetail?.name}
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th>사용부서</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='use_dept'
                                        defaultValue={expenseDetail?.use_department}
                                        readOnly
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
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th>계정과목 </th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='accountDetail'
                                        defaultValue={expenseDetail?.detail_name}
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th>거래처명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='clientId'
                                        defaultValue={expenseDetail?.client_name}
                                        readOnly
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
                                        readOnly
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
                                            readOnly
                                        ></StyledInput>
                                    )}
                                </td>
                                <th>승인일자</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='approval_date'
                                        defaultValue={expenseDetail?.approval_date}
                                        readOnly
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
                                {expenseDetail.is_approval == "W" ? (
                                    <>
                                        <th>대변 계정과목</th>
                                        <td>
                                            <StyledSelectBox
                                                name='detail_code'
                                                options={crebitList}
                                                value={selectedCrebitDetail}
                                                onChange={setSelectedCrebitDetail}
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <th>대변 계정과목</th>
                                        <td>
                                            <StyledInput
                                                type='text'
                                                name='crebit_name'
                                                defaultValue={expenseDetail?.crebit_name}
                                                readOnly
                                            ></StyledInput>
                                        </td>
                                    </>
                                )}
                            </tr>
                            <tr>
                                <th>비고</th>
                                <td colSpan={10}>
                                    <textarea
                                        name='expenseContent'
                                        id='content'
                                        defaultValue={expenseDetail?.expense_content}
                                        readOnly
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </ModalStyledTable>
                    <ButtonArea>
                        {expenseDetail.is_approval == "W" && (
                            <StyledButton type='button' onClick={expenseUpdate}>
                                검토완료
                            </StyledButton>
                        )}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </ButtonArea>
                </form>
            </div>
        </ExpenseReviewModalStyle>
    );
};
