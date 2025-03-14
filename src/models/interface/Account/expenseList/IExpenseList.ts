import { ILoginInfo } from "../../store/userInfo";

export interface IExpenseDetailGroup {
    detail_name: string;
    detail_code: string;
}

export interface IExpenseDetailGroupListBody {
    searchAccount: IExpenseDetailGroup[];
}

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

export interface ILoginInfoBody {
    lgnInfo: ILoginInfo;
}
export interface IClientListBody extends IExpenseDetailGroupListBody {
    clientList: IClient[];
}
export interface IClient {
    id: number;
    clientName: string;
}
