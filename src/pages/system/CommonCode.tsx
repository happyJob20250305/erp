import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { CommonCodeMain } from "../../components/page/Management/CommonCode/CommonCodeMain/CommonCodeMain";
import { CommonCodeSearch } from "../../components/page/Management/CommonCode/CommonCodeSearch/CommonCodeSearch";

export const CommonCode = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                공통코드관리
            </ContentBox>
            <CommonCodeSearch />
            <CommonCodeMain />
        </>
    );
};
