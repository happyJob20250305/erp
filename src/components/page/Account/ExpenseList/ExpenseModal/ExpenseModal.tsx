import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ExpenseListModalStyle } from "./styled";
import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { loginInfoState } from "../../../../../stores/userInfo";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { IExpense } from "../ExpenseListMain/ExpenseListMain";
import {
    IExpenseDetailGroup,
    IExpenseDetailGroupListBody,
    ISetListOption,
} from "../ExpenseListSearch/ExpenseListSearch";

interface ILoginUserInfo {
    usr_idx: number;
    detail_name: string;
    usr_nm: string;
}

interface IPostResponse {
    result: string;
}

interface IManageModalProps {
    expenseDetail?: IExpense;
    postSuccess: () => void;
    setExpenseDetail: (expenseDetail?: IExpense) => void;
}
export interface ILoginInfoBody {
    lgnInfo: ILoginUserInfo;
}
export interface IClientListBody extends IExpenseDetailGroupListBody {
    clientList: IClient[];
}
export interface IClient {
    id: number;
    clientName: string;
}
export const ExpenseModal: FC<IManageModalProps> = ({ expenseDetail, postSuccess, setExpenseDetail }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [selectedGroup, setSelectedGroup] = useState<string>(expenseDetail?.group_code || "AC03");
    const [accountDetailList, setAccountDetailList] = useState<ISetListOption[]>([]);
    const [clientList, setClientList] = useState<ISetListOption[]>([]);
    const [flag, setFlag] = useState<boolean>(false);
    const loginInfo = useRecoilValue<ILoginInfo>(loginInfoState);
    const [loginUserInfo, setLoginUserInfo] = useState<ILoginUserInfo>();
    const formRef = useRef<HTMLFormElement>(null);
    const accountGroupList = [
        { label: "온라인지출", value: "AC03" },
        { label: "영업지출", value: "AC04" },
    ];

    useEffect(() => {
        getLoginInfo();
        if (selectedGroup) {
            searchAccountDetailList(selectedGroup);
        }
    }, [selectedGroup]);

    useEffect(() => {
        return () => {
            setExpenseDetail();
        };
    }, [expenseDetail]);
    const formatDate = moment().format("YYYY-MM-DD");
    const searchAccountDetailList = (selectedGroup: string) => {
        axios
            .post("/account/expenseSearchDetailBody.do", { group_code: selectedGroup })
            .then((res: AxiosResponse<IClientListBody>) => {
                const selectDetailList: ISetListOption[] = [
                    ...res.data.searchAccount.map((detail: IExpenseDetailGroup) => ({
                        label: detail.detail_name,
                        value: detail.detail_code,
                    })),
                ];
                const getClientList: ISetListOption[] = [
                    { label: "", value: "" },
                    ...res.data.clientList.map((detail: IClient) => ({
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

    const getLoginInfo = () => {
        axios
            .post("/account/expenseLoginInfoBody.do", { loginId: loginInfo.loginId })
            .then((res: AxiosResponse<ILoginInfoBody>) => {
                setLoginUserInfo(res.data.lgnInfo);
            });
    };

    const expenseSave = () => {
        axios.post("/account/expenseFileSave.do", formRef.current).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다.");
                postSuccess();
            }
        });
    };

    const expenseDelete = () => {
        axios
            .post("/account/expenseDelete.do", new URLSearchParams({ exp_id: expenseDetail?.id }))
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("삭제되었습니다.");
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
        <ExpenseListModalStyle>
            <div className='container'>
                <form ref={formRef}>
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
                                        defaultValue={expenseDetail ? expenseDetail.req_date : formatDate}
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
                                        defaultValue={expenseDetail ? expenseDetail.emp_no : loginUserInfo?.usr_idx}
                                    ></StyledInput>
                                </td>
                                <th scope='row'>사원명</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={expenseDetail ? expenseDetail.name : loginUserInfo?.usr_nm}
                                    ></StyledInput>
                                </td>
                                <th scope='row'>사용부서</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='use_dept'
                                        defaultValue={
                                            expenseDetail ? expenseDetail.use_department : loginUserInfo?.detail_name
                                        }
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
                                        value={selectedGroup}
                                        onChange={setSelectedGroup}
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
                                                defaultValue={expenseDetail?.client_id || ""}
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
                                        disabled
                                    ></StyledInput>
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
                                <th scope='row'>
                                    첨부파일<span className='font_red'>*</span>
                                </th>

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
                    </table>

                    <div className={"button-container"}>
                        {!expenseDetail && (
                            <StyledButton type='button' onClick={expenseSave}>
                                저장
                            </StyledButton>
                        )}
                        {expenseDetail && (
                            <StyledButton type='button' onClick={expenseDelete}>
                                삭제
                            </StyledButton>
                        )}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                </form>
            </div>
        </ExpenseListModalStyle>
    );
};
