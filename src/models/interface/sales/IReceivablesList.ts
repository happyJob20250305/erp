export interface IReceivablesList {
    orderId: number;
    departmentName: string;
    clientName: string;
    productName: string;
    orderDate: string;
    deliveryDate: string;
    receivableAmount: number;
    receivableStatus: string;
    managerName: string;
}

export interface IReceivablesListDetail extends IReceivablesList {
    orderDate: string;
    clientId: number;
    empId: number;
    orderId: number;
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
    detail: IReceivablesListDetail;
    detailList: IReceivablesListDetail[];
    detailListCnt: number;
}
