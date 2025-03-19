import { AnnualListProvider } from "../../api/Provider/SalesProvider/AnnualProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { AnnualMain } from "../../components/page/Sales/Annual/AnnualMain/AnnualMain";
import { AnnualSearch } from "../../components/page/Sales/Annual/AnnualSearch/AnnualSearch";

export const Annual = () => {
    return (
        <AnnualListProvider>
            <ContentBox variant='primary' fontSize='large'>
                매출관리
            </ContentBox>
            <AnnualSearch />
            <AnnualMain />
        </AnnualListProvider>
    );
};
