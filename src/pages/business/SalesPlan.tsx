import { SalesPlanListProvider } from "../../api/Provider/SalesPlanProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { SalesPlanMain } from "../../components/page/Business/Sales/SalesPlan/SalesPlanMain/SalesPlanMain";
import { SalesPlanSearch } from "../../components/page/Business/Sales/SalesPlan/SalesPlanSearch/SalesPlanSearch";

export const SalesPlan = () => {
    return (
        <>
            <SalesPlanListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    영업 계획
                </ContentBox>
                <SalesPlanSearch />
                <SalesPlanMain />
            </SalesPlanListProvider>
        </>
    );
};
