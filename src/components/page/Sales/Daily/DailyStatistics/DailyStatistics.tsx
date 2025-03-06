import React from "react";
import { IDaily } from "../../../../../models/interface/store/IDaily";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

interface DailyStatisticsProps {
    dailyStatistics: IDaily[];
}

export const DailyStatistics = ({ dailyStatistics }: DailyStatisticsProps) => {
    // 모든 데이터를 합산하여 총합 계산
    const totalSupplyPrice = dailyStatistics.reduce((sum, daily) => sum + daily.totalSupplyPrice, 0);
    const totalExpenseAmount = dailyStatistics.reduce((sum, daily) => sum + daily.totalExpenseAmount, 0);
    const totalRevenueAmount = dailyStatistics.reduce((sum, daily) => sum + (daily.totalRevenueAmount || 0), 0);

    return (
        <StyledTable>
            <thead>
                <tr>
                    <StyledTh></StyledTh>
                    <StyledTh>금액합계(단위: 원)</StyledTh>
                </tr>
            </thead>
            <tbody>
                {dailyStatistics.length > 0 ? (
                    <>
                        <tr>
                            <StyledTd>매출총액①</StyledTd>
                            <StyledTd>{totalSupplyPrice.toLocaleString()} 원</StyledTd>
                        </tr>
                        <tr>
                            <StyledTd>지출총액②</StyledTd>
                            <StyledTd>{totalExpenseAmount.toLocaleString()} 원</StyledTd>
                        </tr>
                        <tr>
                            <StyledTd>손익총계③</StyledTd>
                            <StyledTd>{totalRevenueAmount.toLocaleString()} 원</StyledTd>
                        </tr>
                    </>
                ) : (
                    <tr>
                        <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                    </tr>
                )}
            </tbody>
        </StyledTable>
    );
};
