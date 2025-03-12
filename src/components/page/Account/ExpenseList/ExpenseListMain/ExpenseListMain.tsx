import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useContext, useEffect, useState } from "react";
import { ExpenseListContext } from "../../../../../api/Provider/ExpenseListProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import axios, { AxiosResponse } from "axios";
import { ExpenseListMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { ExpenseModal } from "../ExpenseModal/ExpenseModal";

export interface IExpense {
    id: string;
    req_date: string;
    use_date: string;
    group_name: string;
    group_code: string;
    detail_name: string;
    debit_code: string;
    use_department: string;
    expense_payment: string;
    is_approval: string;
    content: string;
    expense_content: string;
    file_name: string;
    emp_no: number;
    name: string;
    client_id: number;
    approval_date: string;
}

export interface IExpenseResponseBody {
    expense: IExpense[];
    expenseCnt: number;
}
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

    const searchExpenseList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/account/expenseListBody.do", {
                ...searchKeyword,
                pageSize: 5,
                currentPage,
            })
            .then((res: AxiosResponse<IExpenseResponseBody>) => {
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

    const handlerModal = (row: IExpense) => {
        setModal(!modal);
        setExpenseDetail(row);
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
