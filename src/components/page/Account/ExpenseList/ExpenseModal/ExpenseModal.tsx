import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ExpenseListModalStyle } from "./styled";
import { FC, useEffect, useRef, useState } from "react";
import moment from "moment";
import { loginInfoState } from "../../../../../stores/userInfo";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { nullCheck } from "../../../../../common/nullCheck";
import { ButtonArea, ModalStyledTable } from "../../VoucherList/VoucherListModal/styled";
import { IExpense, ILoginInfoBody } from "../../../../../models/interface/account/expenseList/IExpenseList";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { ExpenseList } from "../../../../../api/api";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { accountPostApi } from "../../../../../api/AccountApi/accountPostApi";
import { approvalCode } from "../../../../../common/approvalStatus";
import { IClientListBody } from "../../../../../models/interface/account/groupList/IAccountGroup";

interface IExpenseModalProps {
    expenseDetail?: IExpense;
    postSuccess: () => void;
    setExpenseDetail: (expenseDetail?: IExpense) => void;
}

export const ExpenseModal: FC<IExpenseModalProps> = ({ expenseDetail, postSuccess, setExpenseDetail }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [selectedGroup, setSelectedGroup] = useState<string>(expenseDetail?.group_code || "AC03");
    const [accountDetailList, setAccountDetailList] = useState<ISetListOption[]>([]);
    const [clientList, setClientList] = useState<ISetListOption[]>([]);
    const [flag, setFlag] = useState<boolean>(false);
    const loginInfo = useRecoilValue<ILoginInfo>(loginInfoState);
    const [loginUserInfo, setLoginUserInfo] = useState<ILoginInfo>();
    const formRef = useRef<HTMLFormElement>(null);
    const accountGroupList = [
        { label: "온라인지출", value: "AC03" },
        { label: "영업지출", value: "AC04" },
    ];
    const LaberColor = ({ label, showAsterisk }: { label: string; showAsterisk: boolean }) => (
        <label>
            {label}
            {showAsterisk && <span className='asterisk'> * </span>}
        </label>
    );

    useEffect(() => {
        getLoginInfo();
        if (selectedGroup) {
            searchAccountDetailList(selectedGroup);
        }
    }, [selectedGroup]);

    useEffect(() => {
        return () => {
            setExpenseDetail();
            getLoginInfo();
        };
    }, [expenseDetail]);

    const formatDate = moment().format("YYYY-MM-DD");
    const searchAccountDetailList = async (selectedGroup: string) => {
        const result = await accountSearchApi<IClientListBody>(ExpenseList.searchAccountDetailList, {
            group_code: selectedGroup,
        });
        if (result) {
            setAccountDetailList(setSelectOption(result.searchAccount, "detail_name", "detail_code"));
            setClientList(setSelectOption(result.clientList, "clientName", "id", { label: "", value: "" }));
            if (result) {
                setFlag(true);
            }
        }
    };

    const getLoginInfo = async () => {
        const result = await accountSearchApi<ILoginInfoBody>(ExpenseList.getLoginInfo, { loginId: loginInfo.loginId });
        if (result) {
            setLoginUserInfo(result.lgnInfo);
        }
    };

    const expenseSave = async () => {
        const formData = new FormData(formRef.current);
        const file = formData.get("fileInput") as File | null;
        if (
            !nullCheck([
                { inval: formData.get("use_date").toString(), msg: "사용일자를 선택해주세요." },
                { inval: formData.get("exp_pay").toString(), msg: "결의금액을 입력해주세요." },
            ])
        ) {
            return false;
        } else if (!file || file.size === 0) {
            alert("파일을 첨부해주세요");
            return;
        }
        const result = await accountPostApi<IPostResponse>(ExpenseList.expenseSave, formRef.current);
        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        }
    };

    const expenseDelete = async () => {
        const result = await accountPostApi<IPostResponse>(
            ExpenseList.expenseDelete,
            new URLSearchParams({ exp_id: expenseDetail?.id })
        );
        if (result.result === "success") {
            alert("삭제되었습니다.");
            postSuccess();
        }
    };

    const expensefileDownload = async () => {
        const param = new URLSearchParams();
        param.append("expenseSeq", expenseDetail?.id.toString());

        const result = await accountPostApi<Blob>(ExpenseList.expensefileDownload, param, { responseType: "blob" });
        if (result) {
            const url = window.URL.createObjectURL(result);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", expenseDetail.file_name as string);
            document.body.appendChild(link);
            link.click();

            //브라우저에서 a태그 삭제
            document.body.removeChild(link);
            //삭제
            window.URL.revokeObjectURL(url);
        }
    };

    return (
        <>
            <ExpenseListModalStyle>
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
                                            defaultValue={expenseDetail?.id || "(신청시 자동생성됩니다)"}
                                            readOnly
                                        ></StyledInput>
                                    </td>
                                    <th>신청일자</th>
                                    <td>
                                        <StyledInput
                                            type='date'
                                            name='request_date'
                                            defaultValue={expenseDetail ? expenseDetail.req_date : formatDate}
                                            readOnly
                                        ></StyledInput>
                                    </td>
                                    <th>
                                        <LaberColor label='사용일자' showAsterisk={!expenseDetail}></LaberColor>
                                    </th>
                                    <td>
                                        <StyledInput
                                            type='date'
                                            name='use_date'
                                            defaultValue={expenseDetail?.use_date}
                                            readOnly={!!expenseDetail}
                                        ></StyledInput>
                                    </td>
                                </tr>
                                <tr>
                                    <th>사번</th>
                                    <td>
                                        <StyledInput
                                            type='text'
                                            name='emp_no'
                                            defaultValue={expenseDetail ? expenseDetail.emp_no : loginUserInfo?.usr_idx}
                                            readOnly
                                        ></StyledInput>
                                    </td>
                                    <th scope='row'>사원명</th>
                                    <td>
                                        <StyledInput
                                            type='text'
                                            name='emp_name'
                                            defaultValue={expenseDetail ? expenseDetail.name : loginUserInfo?.usr_nm}
                                            readOnly
                                        ></StyledInput>
                                    </td>
                                    <th>사용부서</th>
                                    <td>
                                        <StyledInput
                                            type='text'
                                            name='use_dept'
                                            defaultValue={
                                                expenseDetail
                                                    ? expenseDetail.use_department
                                                    : loginUserInfo?.detail_name
                                            }
                                            readOnly
                                        ></StyledInput>
                                    </td>
                                </tr>
                                <tr id='writer'>
                                    <th>
                                        <LaberColor label='계정대분류명' showAsterisk={!expenseDetail}></LaberColor>
                                    </th>
                                    <td>
                                        <StyledSelectBox
                                            name='accountGroup'
                                            options={accountGroupList}
                                            value={selectedGroup}
                                            onChange={setSelectedGroup}
                                            disabled={!!expenseDetail}
                                        />
                                    </td>
                                    {flag && (
                                        <>
                                            <th>
                                                <LaberColor label='계정과목' showAsterisk={!expenseDetail}></LaberColor>
                                            </th>
                                            <td>
                                                <StyledSelectBox
                                                    name='accountDetail'
                                                    options={accountDetailList}
                                                    defaultValue={expenseDetail?.debit_code}
                                                    disabled={!!expenseDetail}
                                                />
                                            </td>
                                            <th>
                                                <label>거래처명</label>
                                            </th>
                                            <td>
                                                <StyledSelectBox
                                                    name='clientId'
                                                    options={clientList}
                                                    defaultValue={expenseDetail?.client_id || ""}
                                                    disabled={!!expenseDetail}
                                                />
                                            </td>
                                        </>
                                    )}
                                </tr>
                                <tr>
                                    <th>
                                        <LaberColor label='결의금액' showAsterisk={!expenseDetail}></LaberColor>
                                    </th>
                                    <td>
                                        <StyledInput
                                            type={expenseDetail ? "text" : "number"}
                                            name='exp_pay'
                                            defaultValue={expenseDetail?.expense_payment.toLocaleString("ko-KR")}
                                            readOnly={!!expenseDetail}
                                        ></StyledInput>
                                    </td>
                                    <th scope='row'>승인여부</th>
                                    <td>
                                        <StyledInput
                                            type='text'
                                            name='isApproval'
                                            defaultValue={approvalCode(expenseDetail?.is_approval)}
                                            readOnly
                                        ></StyledInput>
                                    </td>
                                    <th scope='row'>승인일자</th>
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
                                    <th>
                                        <LaberColor label='첨부파일' showAsterisk={!expenseDetail}></LaberColor>
                                    </th>
                                    {!expenseDetail ? (
                                        <td>
                                            <input
                                                type='file'
                                                className='inputTxt p100'
                                                name='fileInput'
                                                id='fileInput'
                                            />
                                        </td>
                                    ) : (
                                        <td>
                                            <div onClick={expensefileDownload}>
                                                <label>다운로드</label>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                                <tr>
                                    <th scope='row'>비고</th>
                                    <td colSpan={10}>
                                        <textarea
                                            name='expenseContent'
                                            id='content'
                                            defaultValue={expenseDetail?.expense_content}
                                            readOnly={!!expenseDetail}
                                        ></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </ModalStyledTable>

                        <ButtonArea>
                            {!expenseDetail && (
                                <StyledButton type='button' onClick={expenseSave}>
                                    신청
                                </StyledButton>
                            )}
                            {expenseDetail && expenseDetail.is_approval == "W" && (
                                <StyledButton type='button' onClick={expenseDelete}>
                                    삭제
                                </StyledButton>
                            )}
                            <StyledButton variant='secondary' type='button' onClick={() => setModal(!modal)}>
                                나가기
                            </StyledButton>
                        </ButtonArea>
                    </form>
                </div>
            </ExpenseListModalStyle>
        </>
    );
};
