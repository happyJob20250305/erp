import { SalesResultProvider } from "../../api/Provider/SalesResultProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { SalesResultMain } from "../../components/page/Business/Sales/SalesResult/SalesResultMain/SalesResultMain";
import { SalesReultSearch } from "../../components/page/Business/Sales/SalesResult/SalesResultSearch/SalesResultSearch";

export const SalesResult = () => {
    return (
        <>
            <SalesResultProvider>
                <ContentBox variant='primary' fontSize='large'>
                    영업 실적
                </ContentBox>
                <SalesReultSearch />
                <SalesResultMain />
            </SalesResultProvider>
        </>
    );
};
