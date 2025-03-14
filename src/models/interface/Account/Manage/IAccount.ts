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

export interface IAccount {
    group_name: string;
    group_code: string;
    detail_code: string;
    detail_name: string;
    use_yn: string;
    content: string;
    code_type: string;
}

export interface IAccountBodyResponse {
    account: IAccount[];
    accountCnt: number;
}

export interface IManageModalProps {
    detailCode?: IAccount;
    postSuccess: () => void;
    setDetailCode: (detailCode?: IAccount) => void;
}
