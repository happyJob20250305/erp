import { IMonthly } from "../../../../../models/interface/IMonthly";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

interface MonthlyStatisticsProps {
    monthlyStatistics: IMonthly;
}

export const MonthlyStatistics = ({ monthlyStatistics }: MonthlyStatisticsProps) => {
    if (!monthlyStatistics) {
        return (
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>데이터가 없습니다.</StyledTh>
                    </tr>
                </thead>
            </StyledTable>
        );
    }
    const { totalSupplyAmount, totalExpenseAmount, totalReceivableAmount, totalRevenueAmount } = monthlyStatistics;

    return (
        <StyledTable>
            <thead>
                <tr>
                    <StyledTh></StyledTh>
                    <StyledTh>금액합계(단위: 원)</StyledTh>
                </tr>
            </thead>
            <tbody>
                <>
                    <tr>
                        <StyledTd>매출 순수익 ①</StyledTd>
                        <StyledTd>{totalSupplyAmount.toString()} 원</StyledTd>
                    </tr>
                    <tr>
                        <StyledTd>지출 총액 ②</StyledTd>
                        <StyledTd>{totalExpenseAmount.toString()} 원</StyledTd>
                    </tr>
                    <tr>
                        <StyledTd>미수금 총액 ③</StyledTd>
                        <StyledTd>{totalReceivableAmount.toString()} 원</StyledTd>
                    </tr>
                    <tr>
                        <StyledTd>손익 총계 (①-②-③)</StyledTd>
                        <StyledTd>{totalRevenueAmount.toString()} 원</StyledTd>
                    </tr>
                </>
            </tbody>
        </StyledTable>
    );
};
