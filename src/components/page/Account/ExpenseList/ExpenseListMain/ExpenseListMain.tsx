import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useContext, useEffect, useState } from "react";
import { ExpenseListContext } from "../../../../../api/Provider/AccountProvider/ExpenseListProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { ExpenseListMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { ExpenseModal } from "../ExpenseModal/ExpenseModal";
import { approvalCode } from "../../../../../common/approvalStatus";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { ExpenseList } from "../../../../../api/api";
import { IExpense, IExpenseResponseBody } from "../../../../../models/interface/account/expenseList/IExpenseList";

export const ExpenseListMain = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const { searchKeyword } = useContext(ExpenseListContext);
    const [expenseList, setExpenseList] = useState<IExpense[]>([]);
    const [expenseListCnt, setExpenseListCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [expenseDetail, setExpenseDetail] = useState<IExpense>();
    const columns = [
        { key: "id", title: "결의번호" },
        { key: "req_date", title: "신청일자" },
        { key: "use_date", title: "사용일자" },
        { key: "group_name", title: "계정대분류명" },
        { key: "detail_name", title: "계정과목" },
        { key: "use_department", title: "사용부서" },
        { key: "expense_payment", title: "결의금액" },
        { key: "actions", title: "승인여부" },
    ] as Column<IExpense>[];

    useEffect(() => {
        searchExpenseList();
    }, [searchKeyword]);

    const searchExpenseList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await accountSearchApi<IExpenseResponseBody>(ExpenseList.searchExpenseList, {
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

    const handlerModal = (row: IExpense) => {
        setModal(!modal);
        setExpenseDetail({
            ...row,
            expense_payment: Number(row.expense_payment),
        });
    };

    const postSuccess = () => {
        setModal(!modal);
        searchExpenseList();
    };

    return (
        <ExpenseListMainStyled>
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
                onChange={searchExpenseList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <ExpenseModal
                        expenseDetail={expenseDetail}
                        postSuccess={postSuccess}
                        setExpenseDetail={setExpenseDetail}
                    />
                </Portal>
            )}
        </ExpenseListMainStyled>
    );
};
