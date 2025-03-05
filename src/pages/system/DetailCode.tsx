import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { DetailCodeMain } from "../../components/page/Management/DetailCode/DetailCodeMain/DetailCodeMain";
import { DetailSearch } from "../../components/page/Management/DetailCode/DetailSearch/DetailSearch";

export const DetailCode = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                상세코드관리
            </ContentBox>
            <DetailSearch />
            <DetailCodeMain></DetailCodeMain>
        </>
    );
};
