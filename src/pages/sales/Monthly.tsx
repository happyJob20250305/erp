import { MonthlyListProvider } from "../../api/Provider/SalesProvider/MonthlyProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { MonthlyMain } from "../../components/page/Sales/Monthly/MonthlyMain/MonthlyMain";
import { MonthlySearch } from "../../components/page/Sales/Monthly/MonthlySearch/MonthlySearch";

export const Monthly = () => {
    return (
        <MonthlyListProvider>
            <ContentBox variant='primary' fontSize='large'>
                월별 매출현황
            </ContentBox>
            <MonthlySearch />
            <MonthlyMain />
        </MonthlyListProvider>
    );
};
