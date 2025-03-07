import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { DetailCodeMain } from "../../components/page/System/DetailCode/DetailCodeMain/DetailCodeMain";

export const DetailCode = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                상세코드관리
            </ContentBox>
            <DetailCodeMain></DetailCodeMain>
        </>
    );
};
