import { IMonthly } from "../../../../../models/interface/sales/IMonthly";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { MonthlyStatisticsStyled } from "./styled";

interface MonthlyStatisticsProps {
    monthlyStatistics: IMonthly[];
}

const formatBigInt = (value: bigint) => {
    return new Intl.NumberFormat("ko-KR").format(value);
};

export const MonthlyStatistics = ({ monthlyStatistics }: MonthlyStatisticsProps) => {
    if (monthlyStatistics.length === 0) {
        return (
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh></StyledTh>
                        <StyledTh>금액합계(단위: 원)</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                    </tr>
                </tbody>
            </StyledTable>
        );
    }

    const totalData = monthlyStatistics.reduce(
        (acc, monthly) => ({
            totalSupplyPrice: acc.totalSupplyPrice + BigInt(monthly.totalSupplyPrice),
            totalUnitPrice: acc.totalUnitPrice + BigInt(monthly.totalUnitPrice),
            totalExpenseAmount: acc.totalExpenseAmount + BigInt(monthly.totalExpenseAmount),
            totalReceivableAmount: acc.totalReceivableAmount + BigInt(monthly.totalReceivableAmount),
        }),
        {
            totalSupplyPrice: BigInt(0),
            totalUnitPrice: BigInt(0),
            totalExpenseAmount: BigInt(0),
            totalReceivableAmount: BigInt(0),
        }
    );

    const totalProfit = totalData.totalSupplyPrice - totalData.totalExpenseAmount - totalData.totalReceivableAmount;

    return (
        <MonthlyStatisticsStyled>
            <thead>
                <tr>
                    <StyledTh></StyledTh>
                    <StyledTh>금액합계(단위: 원)</StyledTh>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <StyledTd>매출 순수익 ①</StyledTd>
                    <StyledTd>{formatBigInt(totalData.totalSupplyPrice - totalData.totalUnitPrice)} </StyledTd>
                </tr>
                <tr>
                    <StyledTd>지출 총액 ②</StyledTd>
                    <StyledTd>{formatBigInt(totalData.totalExpenseAmount)} </StyledTd>
                </tr>
                <tr>
                    <StyledTd>미수금 총액 ③</StyledTd>
                    <StyledTd>{formatBigInt(totalData.totalReceivableAmount)} </StyledTd>
                </tr>
                <tr>
                    <StyledTd>손익 총계 (①-②-③)</StyledTd>
                    <StyledTd>
                        {totalProfit < 0 ? " ▼" : " ▲"}
                        {formatBigInt(totalProfit)}
                    </StyledTd>
                </tr>
            </tbody>
        </MonthlyStatisticsStyled>
    );
};
