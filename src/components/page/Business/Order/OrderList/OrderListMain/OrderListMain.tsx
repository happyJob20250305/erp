import { useState } from "react";
import { Column, StyledTable } from "../../../../../common/StyledTable/StyledTable";
import { OrderListMainStyled } from "./styled";
import axios from "axios";

export interface IOrder {
    id: number;
    client_id: number;
    order_emp_name: string;
    client_name: string;
    product_name: string;
    order_date: string;
    delivery_date: string;
    total_delivery_count: number;
    total_supply_price: number;
    total_tax: number;
    sales_area: string;
}

export const OrderListMain = () => {
    const [orderList, setOrderList] = useState<IOrder[]>([]);
    const columns = [
        { key: "id", title: "수주직원" },
        { key: "cust_update_date", title: "수주날짜" },
        { key: "client_name", title: "거래처 이름" },
        { key: "person", title: "제품명" },
        { key: "ph", title: "납기일" },
        { key: "person_ph", title: "총 납품 개수" },
        { key: "email", title: "총 공급 가액" },
        { key: "addr", title: "총세액" },
        { key: "memo", title: "영역구분(scm/영업)" },
        { key: "memo", title: "수주상세조회" },
    ] as Column<IOrder>[];

    const searchOrderList = () => {
        axios.post("/business/order-information-list/orderListBody.do", {}).then
    }

    return (
        <OrderListMainStyled>
            <StyledTable data={orderList} columns={columns} hoverable={true} fullWidth={true} />
        </OrderListMainStyled>
    );
};
