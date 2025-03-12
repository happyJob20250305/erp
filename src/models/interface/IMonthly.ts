import { MonthlyStatistics } from "./../../components/page/Sales/Monthly/MonthlyStatistics/MonthlyStatistics";
export interface IMonthly {
    orderDate: string;
    orderCount: bigint;
    totalSupplyPrice: bigint;
    totalUnitPrice: bigint;
    totalReceivableAmount: bigint;
    totalExpenseAmount: bigint;
    totalSupplyAmount: BigInt;
    totalRevenueAmount: BigInt;
}

export interface IMonthlyListBodyResponse {
    monthlyList: IMonthly[];
    monthlyStatistics: IMonthly;
}

export interface IMonthlyModalDetail {
    RNUM: number;
    topTitle: string;
    totalSupplyPrice: bigint;
}

export interface IMonthlyProductDetail {
    detail: IMonthlyModalDetail[];
}
export interface IMonthlyClientDetail {
    detail: IMonthlyModalDetail[];
}
