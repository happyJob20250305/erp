import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../../common/StyledTable/StyledTable";
import { OrderListMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { OrderInfoContext } from "../../../../../../api/Provider/OrderInfoProvider";
import { PageNavigate } from "../../../../../common/pageNavigation/PageNavigate";

export interface IOrder {
    // id: number;
    // client_id: number;
    // order_emp_name: string;
    // client_name: string;
    // product_name: string;
    // order_date: string;
    // delivery_date: string;
    // total_delivery_count: number;
    // total_supply_price: number;
    // total_tax: number;
    // sales_area: string;

    // clientId: 19;
    // clientName: "포도기업";
    // deliveryDate: "2025-03-20";
    // departmentCode: null;
    // empId: 0;
    // estimateId: null;
    // id: 80;
    // orderDate: "2025-03-10";
    // orderEmpName: "김영업";
    // productName: "삼성 마우스";
    // salesArea: "SCM";
    // totalDeliveryCount: 10;
    // totalSupplyPrice: 100000;
    // totalTax: 10000;

    clientId: number;
    clientName: string;
    deliveryDate: string;
    departmentCode: null;
    empId: number;
    estimateId: null;
    id: number;
    orderDate: string;
    orderEmpName: string;
    productName: string;
    salesArea: string;
    totalDeliveryCount: number;
    totalSupplyPrice: number;
    totalTax: number;
}

interface IOrderResponse {
    orderList: IOrder[];
    orderCnt: number;
}

export const OrderListMain = () => {
    const [orderList, setOrderList] = useState<IOrder[]>([]);
    const { searchKeyword } = useContext(OrderInfoContext);
    const [orderCount, setOrderCount] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    useEffect(() => {
        searchOrderList();
    }, [searchKeyword]);

    const columns = [
        { key: "id", title: "수주직원" },
        { key: "orderDate", title: "수주날짜" },
        { key: "clientName", title: "거래처 이름" },
        { key: "productName", title: "제품명" },
        { key: "deliveryDate", title: "납기날짜" },
        { key: "totalDeliveryCount", title: "총 납품 개수" },
        { key: "totalSupplyPrice", title: "총 공급 가액" },
        { key: "totalTax", title: "총세액" },
        { key: "salesArea", title: "영역구분(scm/영업)" },
        { key: "orderDetail", title: "수주상세조회" },
    ] as Column<IOrder>[];

    const searchOrderList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/business/order-information-list/orderListBody.do", {
                ...searchKeyword,
                currentPage,
                pageSize: 5,
            })
            .then((res: AxiosResponse<IOrderResponse>) => {
                setOrderList(res.data.orderList);
                setOrderCount(res.data.orderCnt);
                setCPage(currentPage);
            });
    };

    return (
        <OrderListMainStyled>
            <StyledTable data={orderList} columns={columns} hoverable={true} fullWidth={true} />
            <PageNavigate
                totalItemsCount={orderCount}
                onChange={searchOrderList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </OrderListMainStyled>
    );
};
