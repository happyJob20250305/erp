import { OrderListProvider } from "../../api/Provider/OrderListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { OrderListMain } from "../../components/page/Business/Order/OrderList/OrderListMain/OrderListMain";
import { OrderListSearch } from "../../components/page/Business/Order/OrderList/OrderListSearch/OrderListSearch";

export const OrderList = () => {
    return (
        <>
            <OrderListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    수주 정보 조회
                </ContentBox>
                <OrderListSearch />
                <OrderListMain />
            </OrderListProvider>
        </>
    );
};
