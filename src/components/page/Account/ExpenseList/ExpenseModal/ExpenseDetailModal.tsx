import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ExpenseListModalStyle } from "./styled";
import { useEffect, useState } from "react";
import { IAccountGroupOption } from "../../Manage/ManageSearch.tsx/ManageSearch";
import axios from "axios";

export const ExpenseDetailModal = ({ expenseDetail, postSuccess, setExpenseDetail }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [selectedGroup, setSelectedGroup] = useState<string>(expenseDetail?.group_code || "AC03");
    const [selectedDetail, setSelectedDetail] = useState<string>(expenseDetail?.detail_name || "");
    const [selectedClient, setSelectedClient] = useState<string>(expenseDetail?.client_name || "");
    const [accountDetailList, setAccountDetailList] = useState<IAccountGroupOption[]>([]);
    const [clientList, setClientList] = useState([]);
    const [flag, setFlag] = useState<boolean>(false);
    const accountGroupList = [
        { label: "온라인지출", value: "AC03" },
        { label: "영업지출", value: "AC04" },
    ];

    useEffect(() => {
        if (selectedGroup) {
            searchAccountDetailList(selectedGroup);
        }
    }, [selectedGroup]);

    useEffect(() => {
        return () => {
            setExpenseDetail();
        };
    }, [expenseDetail]);

    const searchAccountDetailList = (selectedGroup: string) => {
        axios.post("/account/expenseSearchDetailBody.do", { group_code: selectedGroup }).then((res) => {
            const selectDetailList = [
                ...res.data.searchAccount.map((detail) => ({
                    label: detail.detail_name,
                    value: detail.detail_code,
                })),
            ];
            const getClientList = [
                { label: "전체", value: "" },
                ...res.data.clientList.map((detail) => ({
                    label: detail.clientName,
                    value: detail.id,
                })),
            ];
            setAccountDetailList(selectDetailList);
            setClientList(getClientList);

            if (res.data) {
                setFlag(true);
            }
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
        <ExpenseListModalStyle>
            <div className='container'>
                <form>
                    <table className='row'>
                        <caption>caption</caption>
                        <tbody>
                            <tr>
                                <th scope='row'>결의번호</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_id'
                                        defaultValue={expenseDetail?.id || "(신청시 자동생성됩니다)"}
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
                                    ></StyledInput>
                                </td>
                                <th scope='row'>사원명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={expenseDetail?.name}
                                    ></StyledInput>
                                </td>
                                <th scope='row'>사용부서</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='use_dept'
                                        defaultValue={expenseDetail?.use_department}
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr id='writer'>
                                <th scope='row'>
                                    계정대분류명 <span className='font_red'>*</span>
                                </th>
                                <td>
                                    <StyledSelectBox
                                        name='accountGroup'
                                        options={accountGroupList}
                                        defaultValue={expenseDetail?.group_code}
                                    />
                                </td>
                                {flag && (
                                    <>
                                        <th scope='row'>
                                            계정과목 <span className='font_red'>*</span>
                                        </th>
                                        <td>
                                            <StyledSelectBox
                                                name='accountDetail'
                                                options={accountDetailList}
                                                defaultValue={expenseDetail?.debit_code}
                                            />
                                        </td>
                                        <th scope='row'>
                                            거래처명 <span className='font_red'>*</span>
                                        </th>
                                        <td>
                                            <StyledSelectBox
                                                name='clientId'
                                                options={clientList}
                                                defaultValue={expenseDetail?.client_id}
                                            />
                                        </td>
                                    </>
                                )}
                            </tr>
                            <tr>
                                <th scope='row'>
                                    결의금액 <span className='font_red'>*</span>
                                </th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_pay'
                                        defaultValue={expenseDetail?.expense_payment}
                                    ></StyledInput>
                                </td>
                                <th scope='row'>승인여부</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='isApproval'
                                        defaultValue={approvalCode(expenseDetail?.is_approval)}
                                    ></StyledInput>
                                </td>
                                <th scope='row'>승인일자</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='approval_date'
                                        defaultValue={expenseDetail?.approval_date}
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>
                                    첨부파일<span className='font_red'>*</span>
                                </th>
                                <td>
                                    <input type='file' className='inputTxt p100' name='fileInput' id='fileInput' />
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>비고</th>
                                <td>
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
                        <StyledButton type='button'>수정</StyledButton>
                        <StyledButton type='button'>삭제</StyledButton>
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                </form>
            </div>
        </ExpenseListModalStyle>
    );
};
