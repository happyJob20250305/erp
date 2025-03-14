import { OrderInfoContext, OrderInfoProvider } from "../../api/Provider/OrderInfoProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { OrderListMain } from "../../components/page/Business/Order/OrderList/OrderListMain/OrderListMain";
import { OrderListSearch } from "../../components/page/Business/Order/OrderList/OrderListSearch/OrderListSearch";

export const OrderList = () => {
    return (
        <>
            <OrderInfoProvider>
                <ContentBox variant='primary' fontSize='large'>
                    수주 조회/작성
                </ContentBox>
                <OrderListSearch />
                <OrderListMain />
            </OrderInfoProvider>
        </>
    );
};
