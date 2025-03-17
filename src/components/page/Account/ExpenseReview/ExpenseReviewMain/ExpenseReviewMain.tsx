import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ExpenseReviewMainStyled } from "./styled";
import { useContext, useEffect, useState } from "react";
import { ExpenseReviewContext } from "../../../../../api/Provider/AccountProvider/ExpenseReviewProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { ExpenseReviewModal } from "../ExpenseReviewModal/ExpenseReviewModal";
import { useLocation } from "react-router-dom";
import { ExpenseApprovalModal } from "../../ExpenseApproval/ExpenseApprovalModal/ExpenseApprovalModal";
import { approvalCode } from "../../../../../common/approvalStatus";
import {
    IExpenseReview,
    IExpenseReviewResponseBody,
} from "../../../../../models/interface/account/expenseReview/IExpenseReview";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { ExpenseReview } from "../../../../../api/api";

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
        { key: "expense_payment", title: "결의금액", isMoney: true },
        { key: "actions", title: "승인여부" },
    ] as Column<IExpenseReview>[];

    useEffect(() => {
        searchExpenseReviewList();
    }, [searchKeyword]);

    const searchExpenseReviewList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await accountSearchApi<IExpenseReviewResponseBody>(ExpenseReview.searchExpenseReviewList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });
        if (result) {
            setExpenseList(result.expense);
            setExpenseListCnt(result.expenseCnt);
            setCPage(currentPage);
        }
    };

    const handlerModal = (row: IExpenseReview) => {
        setModal(!modal);
        setExpenseDetail({
            ...row,
            expense_payment: row.expense_payment.toLocaleString("ko-KR"),
        });
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
