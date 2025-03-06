import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IDaily, IDailyListBodyResponse } from "../../../../../models/interface/store/IDaily";
import { Daily } from "../../../../../api/api";
import { searchApi } from "../../../../../api/DailyApi/searchApi";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { DailyChart } from "../DailyChart/DailyChart";
import { Chart, registerables } from "chart.js";
import { DailyStatistics } from "../DailyStatistics/DailyStatistics";
Chart.register(...registerables);

export const DailyMain = () => {
    const { search } = useLocation();
    const [dailyList, setDailyList] = useState<IDaily[]>([]);
    const [dailyCount, setDailyCount] = useState<number>(0);
    const [cPage, setCpage] = useState<number>(0);

    useEffect(() => {
        searchDailyList();
    }, [search]);

    const searchDailyList = async (currentPage?: number) => {
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams(search);
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        const result = await searchApi<IDailyListBodyResponse, URLSearchParams>(Daily.search, searchParam);

        if (result) {
            setDailyList(result.dailyList);
            setDailyCount(result.dailyListCnt);
            setCpage(currentPage);
        }
    };

    return (
        <>
            {/* 별도의 Chart 컴포넌트 사용 */}
            <DailyChart dailyListChart={dailyList} />
            <DailyStatistics dailyStatistics={dailyList}></DailyStatistics>
            {/* 기존 테이블 유지 */}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>날짜</StyledTh>
                        <StyledTh>구분</StyledTh>
                        <StyledTh>기업 코드</StyledTh>
                        <StyledTh>기업명</StyledTh>
                        <StyledTh>매출 구분</StyledTh>
                        <StyledTh>매출 상세</StyledTh>
                        <StyledTh>수익 금액</StyledTh>
                        <StyledTh>지출 금액</StyledTh>
                        <StyledTh>당일 미수금 기록</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {dailyList?.length > 0 ? (
                        dailyList.map((daily) => {
                            return (
                                <tr key={daily.clientId}>
                                    <StyledTd>{daily.salesDate}</StyledTd>
                                    <StyledTd>{daily.type}</StyledTd>
                                    <StyledTd>{daily.clientId}</StyledTd>
                                    <StyledTd>{daily.clientName}</StyledTd>
                                    <StyledTd>{daily.crebitCode}</StyledTd>
                                    <StyledTd>{daily.debitCode}</StyledTd>
                                    <StyledTd>{daily.totalSupplyPrice}</StyledTd>
                                    <StyledTd>{daily.totalExpenseAmount}</StyledTd>
                                    <StyledTd>{daily.totalReceivableAmount}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={9}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

            {/* 페이지 네비게이션 유지 */}
            <PageNavigate
                totalItemsCount={dailyCount}
                onChange={searchDailyList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </>
    );
};
