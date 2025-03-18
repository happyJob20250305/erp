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
    expense_payment: number | string;
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
