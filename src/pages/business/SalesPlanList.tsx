import { SalesPlanListProvider } from "../../api/Provider/SalesPlanProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { SalesPlanListMain } from "../../components/page/Business/Sales/SalesPlan/SalesPlanListMain/SalesPlanMain";
import { SalesPlanListSearch } from "../../components/page/Business/Sales/SalesPlan/SalesPlanSearch/SalesPlanListSearch";

export const SalesPlanList = () => {
    return (
        <>
            <SalesPlanListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    제품 품목별 일일 영업계획
                </ContentBox>
                <SalesPlanListSearch />
                <SalesPlanListMain />
            </SalesPlanListProvider>
        </>
    );
};
