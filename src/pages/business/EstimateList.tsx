import { EstimateListProvider } from "../../api/Provider/EstimateListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { EstimateListMain } from "../../components/page/Business/Estimate/EstimateList/EstimateListMain/EstimateListMain";
import { EstimateListSearch } from "../../components/page/Business/Estimate/EstimateList/EstimateListSearch/EstimateListSearch";

export const EstimateList = () => {
    return (
        <>
            <EstimateListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    견적서 등록 및 조회
                </ContentBox>
                <EstimateListSearch />
                <EstimateListMain />
            </EstimateListProvider>
        </>
    );
};
