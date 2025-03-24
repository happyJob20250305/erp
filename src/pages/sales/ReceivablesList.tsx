import { ReceivablesListProvider } from "../../api/Provider/SalesProvider/ReceivablesListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ReceivablesListMain } from "../../components/page/Sales/ReceivablesList/ReceivablesListMain/ReceivablesListMain";
import { ReceivablesListSearch } from "../../components/page/Sales/ReceivablesList/ReceivablesListSearch/ReceivablesListSearch";

export const ReceivablesList = () => {
    return (
        <ReceivablesListProvider>
            <ContentBox variant='primary' fontSize='large'>
                미수금 조회 및 영업수주 입금 처리
            </ContentBox>
            <ReceivablesListSearch />
            <ReceivablesListMain />
        </ReceivablesListProvider>
    );
};
