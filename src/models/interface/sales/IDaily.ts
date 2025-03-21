export interface IDaily {
    salesDate: string;
    type: string;
    clientId: number;
    clientName: string;
    crebitCode: string;
    debitCode: string;
    totalSupplyPrice: bigint;
    totalExpenseAmount: bigint;
    totalReceivableAmount: bigint;
    totalRevenueAmount: bigint;
}

export interface IDailyListBodyResponse {
    dailyList: IDaily[];
    dailyListCnt: number;
    dailyStatistics: IDaily;
    dailyListChart: IDaily[];
}
