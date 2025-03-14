export interface IVoucher {
    voucher_no: string;
    voucher_date: string;
    account_type: string;
    client_name: string;
    debit_name: string;
    crebit_name: string;
    voucher_amount: number;
    order_id: number;
    exp_id: number;
    emp_name: string;
}

export interface IVocherResponseBody {
    voucher: IVoucher[];
    voucherCnt: number;
}
