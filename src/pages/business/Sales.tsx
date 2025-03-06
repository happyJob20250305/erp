import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { SalesPlanMain } from "../../components/page/Business/Sales/SalesMain/SalesPlanMain";
import { SalesPlanSearch } from "../../components/page/Business/Sales/SalesSearch/SalesPlanSearch";

export const Sales = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                영업 계획
            </ContentBox>
            <SalesPlanSearch />
            <SalesPlanMain />
        </>
    );
};
