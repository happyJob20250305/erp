export interface IReceivablesList {
    orderId: number;
    departmentName: string;
    clientName: string;
    productName: string;
    orderDate: string;
    deliveryDate: string;
    receivableAmount: bigint;
    receivableStatus: string;
    managerName: string;
}

export interface IReceivablesListDetail extends IReceivablesList {
    orderDate: string;
    deliveryDate: string;
    voucherNo: string;
    departmentName: string;
    totalDeliveryCount: bigint;
    totalSupplyPrice: bigint;
    totalTax: bigint;
    depositAmount: bigint;
    receivableStatus: string;
    totalReceivableAmount: bigint;
    clientName: string;
    person: string;
    personPh: string;
    managerName: string;
    receivableId: number;
    productName: string;
    quantity: number;
    supplyPrice: bigint;
    unitPrice: bigint;
}

export interface IReceivablesListResponse {
    receivableList: IReceivablesList[];
    receivableCnt: number;
}

export interface IReceivablesDetail {
    detailList: IReceivablesListDetail;
    detailListCnt: number;
}
