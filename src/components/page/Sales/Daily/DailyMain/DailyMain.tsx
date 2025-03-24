import { useContext, useEffect, useState } from "react";
import { Daily } from "../../../../../api/api";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Chart, registerables } from "chart.js";
import { DailyStatistics } from "../DailyStatistics/DailyStatistics";
import { IDaily, IDailyListBodyResponse } from "../../../../../models/interface/sales/IDaily";
import { ChartContainer, ChartWrapper, StatisticsWrapper } from "./styled";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { DailyListContext } from "../../../../../api/Provider/SalesProvider/DailyProvider";
import { searchApi } from "../../../../../api/SalesApi/searchApi";
import { DailyChart } from "../DailyChart/DailyChart";
Chart.register(...registerables);

export const DailyMain = () => {
    const { searchKeyword } = useContext(DailyListContext);
    const [dailyList, setDailyList] = useState<IDaily[]>([]);
    const [dailyListChart, setDailyListChart] = useState<IDaily[]>([]);
    const [dailyCount, setDailyCount] = useState<number>(0);
    const [dailyStatistics, setDailyStatistics] = useState<IDaily>(null);
    const [cPage, setCpage] = useState<number>(0);

    const columns = [
        { key: "salesDate", title: "날짜" },
        { key: "type", title: "구분" },
        { key: "clientId", title: "기업코드" },
        { key: "clientName", title: "기업명" },
        { key: "crebitCode", title: "매출 구분" },
        { key: "debitCode", title: "매출 상세" },
        { key: "totalSupplyPrice", title: "수익 금액", isMoney: true },
        { key: "totalExpenseAmount", title: "지출 금액", isMoney: true },
        { key: "totalReceivableAmount", title: "당일 미수금 기록", isMoney: true },
    ] as Column<IDaily>[];

    useEffect(() => {
        searchDailyList();
    }, [searchKeyword]);

    const searchDailyList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IDailyListBodyResponse>(Daily.search, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

        if (result) {
            setDailyList(result.dailyList);
            setDailyCount(result.dailyListCnt);
            setDailyListChart(result.dailyListChart);
            setDailyStatistics(result.dailyStatistics);
            setCpage(currentPage);
        }
    };

    return (
        <>
            <ChartContainer>
                <ChartWrapper>
                    <DailyChart dailyListChart={dailyListChart} />
                </ChartWrapper>
                <StatisticsWrapper>
                    <DailyStatistics dailyStatistics={dailyStatistics}></DailyStatistics>
                </StatisticsWrapper>
            </ChartContainer>
            <span>※ 검색일자를 기준으로 최근 5일간의 데이터입니다.</span>
            <StyledTable columns={columns} data={dailyList} hoverable={true} fullWidth={true} />
            <PageNavigate
                totalItemsCount={dailyCount}
                onChange={searchDailyList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </>
    );
};
