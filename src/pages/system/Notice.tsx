import { SystemProvider } from "../../api/Provider/SystemProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { NoticeMain } from "../../components/page/System/Notice/NoticeMain/NoticeMain";
import { NoticeSearch } from "../../components/page/System/Notice/NoticeSearch/NoticeSearch";

export const Notice = () => {
    return (
        <SystemProvider>
            <ContentBox variant='primary' fontSize='large'>
                공지사항
            </ContentBox>
            <NoticeSearch />
            <NoticeMain />
        </SystemProvider>
    );
};
