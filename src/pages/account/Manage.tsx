import { AccountManageProvider } from "../../api/Provider/AccountProvider/AccountManageProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ManageMain } from "../../components/page/Account/Manage/ManageMain/ManageMain";
import { ManageSearch } from "../../components/page/Account/Manage/ManageSearch.tsx/ManageSearch";

export const Manage = () => {
    return (
        <AccountManageProvider>
            <ContentBox variant='primary' fontSize='large'>
                계정과목 관리
            </ContentBox>
            <ManageSearch />
            <ManageMain />
        </AccountManageProvider>
    );
};
