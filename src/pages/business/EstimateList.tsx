import { EstimateListProvider } from "../../api/Provider/EstimateListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { EstimateListMain } from "../../components/page/Business/Estimate/EstimateList/EstimateListMain/EstimateListMain";
import { EstimateListSearch } from "../../components/page/Business/Estimate/EstimateList/EstimateListSearch/EstimateListSearch";

export const EstimateList = () => {
    return (
        <>
            <EstimateListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    견적서 조회/등록
                </ContentBox>
                <EstimateListSearch />
                <EstimateListMain />
            </EstimateListProvider>
        </>
    );
};
