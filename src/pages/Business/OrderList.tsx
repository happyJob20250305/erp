import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { OrderListMain } from "../../components/page/Business/Order/OrderList/OrderListMain/OrderListMain";

export const OrderList = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                수주 조회/작성
            </ContentBox>
            <OrderListMain />
        </>
    );
};
