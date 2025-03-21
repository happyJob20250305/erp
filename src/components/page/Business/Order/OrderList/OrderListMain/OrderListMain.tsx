import { useContext, useEffect, useState } from "react";
import { OrderListMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { OrderListContext } from "../../../../../../api/Provider/OrderListProvider";
import { PageNavigate } from "../../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { Portal } from "../../../../../common/potal/Portal";
import { OrderListModal } from "../OrderListModal/OrderListModal";
import { StyledTable, StyledTd, StyledTh } from "../../../../../common/styled/StyledTable";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";

export interface IOrder {
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

interface IOrderListResponse {
    orderList: IOrder[];
    orderCnt: number;
}

export const OrderListMain = () => {
    const [orderList, setOrderList] = useState<IOrder[]>([]);
    const [orderCount, setOrderCount] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    const { searchKeyword } = useContext(OrderListContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [orderId, setOrderId] = useState<number>();
    const [clientId, setClientId] = useState<number>();

    useEffect(() => {
        searchOrderList();
    }, [searchKeyword]);

    const searchOrderList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/business/order-information-list/orderListBody.do", {
                ...searchKeyword,
                currentPage,
                pageSize: 5,
            })
            .then((res: AxiosResponse<IOrderListResponse>) => {
                setOrderList(res.data.orderList);
                setOrderCount(res.data.orderCnt);
                setCPage(currentPage);
            });
    };

    const handlerOrderListModal = (id: number, clientId: number) => {
        setModal(!modal);
        setOrderId(id);
        setClientId(clientId);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchOrderList();
    };

    return (
        <OrderListMainStyled>
            <>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>수주직원</StyledTh>
                            <StyledTh>수주날짜</StyledTh>
                            <StyledTh>거래처</StyledTh>
                            <StyledTh>제품</StyledTh>
                            <StyledTh>납기날짜</StyledTh>
                            <StyledTh>총납품개수</StyledTh>
                            <StyledTh>총공급가액</StyledTh>
                            <StyledTh>총세액</StyledTh>
                            <StyledTh>영역구분(scm/영업)</StyledTh>
                            <StyledTh>수주상세조회</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList?.length > 0 ? (
                            orderList.map((order) => {
                                return (
                                    <tr key={order?.id}>
                                        <StyledTd>{order.orderEmpName}</StyledTd>
                                        <StyledTd>{order.orderDate}</StyledTd>
                                        <StyledTd>{order.clientName}</StyledTd>
                                        <StyledTd>{order.productName}</StyledTd>
                                        <StyledTd>{order.deliveryDate}</StyledTd>
                                        <StyledTd>{order.totalDeliveryCount}</StyledTd>
                                        <StyledTd>{order.totalSupplyPrice}</StyledTd>
                                        <StyledTd>{order.totalTax}</StyledTd>
                                        <StyledTd>{order.salesArea}</StyledTd>
                                        <StyledTd>
                                            <StyledButton
                                                onClick={() => handlerOrderListModal(order?.id, order?.clientId)}
                                            >
                                                수주서상세보기
                                            </StyledButton>
                                        </StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <StyledTd colSpan={10}>조회 내역이 없습니다.</StyledTd>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </>
            <PageNavigate
                totalItemsCount={orderCount}
                onChange={searchOrderList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <OrderListModal
                        orderId={orderId}
                        setOrderId={setOrderId}
                        clientId={clientId}
                        setClientId={setClientId}
                        postSuccess={postSuccess}
                    />
                </Portal>
            )}
        </OrderListMainStyled>
    );
};
