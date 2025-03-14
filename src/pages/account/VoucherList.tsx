import { VoucherListProvider } from "../../api/Provider/VoucherListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { VoucherListMain } from "../../components/page/Account/VoucherList/VoucherListMain/VoucherListMain";
import { VoucherListSearch } from "../../components/page/Account/VoucherList/VoucherListSearch/VoucherListSearch";

export const VoucherList = () => {
    return (
        <VoucherListProvider>
            <ContentBox variant='primary' fontSize='large'>
                회계전표 조회
            </ContentBox>
            <VoucherListSearch />
            <VoucherListMain />
        </VoucherListProvider>
    );
};
