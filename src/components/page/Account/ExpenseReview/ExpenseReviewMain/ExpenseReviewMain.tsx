import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ExpenseReviewMainStyled } from "./styled";
import { useContext, useEffect, useState } from "react";
import { ExpenseReviewContext } from "../../../../../api/Provider/ExpenseReviewProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import axios, { AxiosResponse } from "axios";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { ExpenseReviewModal } from "../ExpenseReviewModal/ExpenseReviewModal";
import { useLocation } from "react-router-dom";
import { ExpenseApprovalModal } from "../../ExpenseApproval/ExpenseApprovalModal/ExpenseApprovalModal";

export interface IExpenseReview {
    id: string;
    req_date: string;
    use_date: string;
    emp_no: number;
    name: string;
    group_name: string;
    group_code: string;
    detail_name: string;
    debit_code: string;
    crebit_code: string;
    crebit_name: string;
    use_department: string;
    expense_payment: string;
    is_approval: string;
    content: string;
    expense_content: string;
    file_name: string;
    client_id: number;
    client_name: string;
    approval_date: string;
}

export interface IExpenseReviewResponseBody {
    expense: IExpenseReview[];
    expenseCnt: number;
}

export const ExpenseReviewMain = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const { searchKeyword } = useContext(ExpenseReviewContext);
    const [expenseList, setExpenseList] = useState<IExpenseReview[]>([]);
    const [expenseListCnt, setExpenseListCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [expenseDetail, setExpenseDetail] = useState<IExpenseReview>();
    const location = useLocation();
    const isReview = location.pathname.includes("expense-review");
    const isApproval = location.pathname.includes("expense-approval");
    const columns = [
        { key: "id", title: "결의번호" },
        { key: "req_date", title: "신청일자" },
        { key: "use_date", title: "사용일자" },
        { key: "emp_no", title: "사번" },
        { key: "name", title: "사원명" },
        { key: "group_name", title: "계정대분류명" },
        { key: "detail_name", title: "계정과목" },
        { key: "use_department", title: "사용부서" },
        { key: "expense_payment", title: "결의금액" },
        { key: "actions", title: "승인여부" },
    ] as Column<IExpenseReview>[];

    useEffect(() => {
        searchExpenseReviewList();
    }, [searchKeyword]);

    const searchExpenseReviewList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/account/expenseListBody.do", {
                ...searchKeyword,
                pageSize: 5,
                currentPage,
            })
            .then((res: AxiosResponse<IExpenseReviewResponseBody>) => {
                setExpenseList(res.data.expense);
                setExpenseListCnt(res.data.expenseCnt);
                setCPage(currentPage);
            });
    };

    const approvalCode = (value: string) => {
        switch (value) {
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

    const handlerModal = (row: IExpenseReview) => {
        setModal(!modal);
        setExpenseDetail(row);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchExpenseReviewList();
    };
    return (
        <ExpenseReviewMainStyled>
            <StyledTable
                data={expenseList}
                columns={columns}
                fullWidth={true}
                renderAction={(row) => approvalCode(row.is_approval)}
                onCellClick={(row) => {
                    handlerModal(row);
                }}
            />
            <PageNavigate
                totalItemsCount={expenseListCnt}
                onChange={searchExpenseReviewList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    {isReview && (
                        <ExpenseReviewModal
                            expenseDetail={expenseDetail}
                            postSuccess={postSuccess}
                            setExpenseDetail={setExpenseDetail}
                        />
                    )}
                    {isApproval && (
                        <ExpenseApprovalModal
                            expenseDetail={expenseDetail}
                            postSuccess={postSuccess}
                            setExpenseDetail={setExpenseDetail}
                        />
                    )}
                </Portal>
            )}
        </ExpenseReviewMainStyled>
    );
};
