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
}
