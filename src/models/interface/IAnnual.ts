export interface IAnnual {
    orderDate: string;
    orderCount: bigint;
    totalSupplyPrice: bigint;
    totalUnitPrice: bigint;
    totalExpenseAmount: bigint;
    totalReceivableAmount: bigint;
    totalRevenueAmount: bigint;
    totalSupplyAmount: bigint;
}
export interface IAnnualListBodyResponse {
    annualList: IAnnual[];
}

export interface IAnnualModalDetail {
    RNUM: number;
    topTitle: string;
    totalSupplyPrice: bigint;
}

export interface IAnnualProductDetail {
    detail: IAnnualModalDetail[];
}

export interface IAnnualClientDetail {
    detail: IAnnualModalDetail[];
}
