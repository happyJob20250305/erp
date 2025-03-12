import { SystemProvider } from "../../api/Provider/SystemProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { CommonCodeMain } from "../../components/page/System/CommonCode/CommonCodeMain/CommonCodeMain";
import { CommonCodeSearch } from "../../components/page/System/CommonCode/CommonCodeSearch/CommonCodeSearch";

export const CommonCode = () => {
    return (
        <SystemProvider>
            <ContentBox variant='primary' fontSize='large'>
                공통코드관리
            </ContentBox>
            <CommonCodeSearch />
            <CommonCodeMain />
        </SystemProvider>
    );
};
