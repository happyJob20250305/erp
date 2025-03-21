import { DailyListProvider } from "../../api/Provider/SalesProvider/DailyProvider";
import { ChartDataProvider } from "../../api/Provider/SalesProvider/ChartProvider"; // ChartDataProvider 임포트
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { DailyMain } from "../../components/page/Sales/Daily/DailyMain/DailyMain";
import { DailySearch } from "../../components/page/Sales/Daily/DailySearch/DailySearch";

export const Daily = () => {
    return (
        <DailyListProvider>
            <ChartDataProvider>
                <ContentBox variant='primary' fontSize='large'>
                    일별 매출현황
                </ContentBox>
                <DailySearch />
                <DailyMain />
            </ChartDataProvider>
        </DailyListProvider>
    );
};
