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
