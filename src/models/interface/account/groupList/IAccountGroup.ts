export interface IAccountGroup {
    group_name: string;
    group_code: string;
}

export interface IDetailGroup {
    detail_name: string;
    detail_code: string;
}

export interface IAccountGroupListBody {
    accountGroupList: IAccountGroup[];
}

export interface IDetailGroupListBody {
    searchAccount: IDetailGroup[];
}

export interface IClientListBody extends IDetailGroupListBody {
    clientList: IClient[];
}
export interface IClient {
    id: number;
    clientName: string;
}

export interface ICrebitList {
    detail_code: string;
    detail_name: string;
}

export interface IExpenseReviewBody {
    crebitList: ICrebitList[];
}
