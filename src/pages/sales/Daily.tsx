import { DailyListProvider } from "../../api/Provider/SalesProvider/DailyProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { DailyMain } from "../../components/page/Sales/Daily/DailyMain/DailyMain";
import { DailySearch } from "../../components/page/Sales/Daily/DailySearch/DailySearch";

export const Daily = () => {
    return (
        <DailyListProvider>
            <ContentBox variant='primary' fontSize='large'>
                매출관리
            </ContentBox>
            <DailySearch />
            <DailyMain />
        </DailyListProvider>
    );
};
