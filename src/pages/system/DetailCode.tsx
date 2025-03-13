import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { DetailCodeMain } from "../../components/page/System/DetailCode/DetailCodeMain/DetailCodeMain";
import { DetailCodeSearch } from "../../components/page/System/DetailCode/DetailCodeSearch/DetailCodeSearch";

export const DetailCode = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                상세코드관리
            </ContentBox>
            <DetailCodeSearch></DetailCodeSearch>
            <DetailCodeMain></DetailCodeMain>
        </>
    );
};
