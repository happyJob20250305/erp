import { SalesResultListProvider } from "../../api/Provider/SalesResultProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { SalesResultMainList } from "../../components/page/Business/Sales/SalesResult/SalesResultListMain/SalesResultListMain";
import { SalesReultListSearch } from "../../components/page/Business/Sales/SalesResult/SalesResultListSearch/SalesResultListSearch";

export const SalesResultList = () => {
    return (
        <>
            <SalesResultListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    영업실적 조회
                </ContentBox>
                <SalesReultListSearch />
                <SalesResultMainList />
            </SalesResultListProvider>
        </>
    );
};
