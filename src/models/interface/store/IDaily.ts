export interface IDaily {
    salesDate: string;
    type: string;
    clientId: number;
    clientName: string;
    crebitCode: string;
    debitCode: string;
    totalSupplyPrice: number;
    totalExpenseAmount: number;
    totalReceivableAmount: number;
    totalRevenueAmount: number;
}

export interface IDailyListBodyResponse {
    dailyList: IDaily[];
    dailyListCnt: number;
}
