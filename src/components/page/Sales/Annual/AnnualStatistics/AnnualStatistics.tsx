import { IAnnual } from "../../../../../models/interface/sales/IAnnual";
import { ColoredTd } from "../../Daily/DailyStatistics/styled";
import { AnnualStatisticsStyled, StyledTd, StyledTh } from "./styled";

interface AnnualStatisticsProps {
    annualStatistics: IAnnual[];
}

const formatBigInt = (value: bigint) => {
    return new Intl.NumberFormat("ko-KR").format(value);
};

export const AnnualStatistics = ({ annualStatistics }: AnnualStatisticsProps) => {
    if (annualStatistics.length === 0) {
        return (
            <AnnualStatisticsStyled>
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
            </AnnualStatisticsStyled>
        );
    }

    const totalData = annualStatistics.reduce(
        (acc, annual) => ({
            totalSupplyPrice: acc.totalSupplyPrice + BigInt(annual.totalSupplyPrice),
            totalUnitPrice: acc.totalUnitPrice + BigInt(annual.totalUnitPrice),
            totalExpenseAmount: acc.totalExpenseAmount + BigInt(annual.totalExpenseAmount),
            totalReceivableAmount: acc.totalReceivableAmount + BigInt(annual.totalReceivableAmount),
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
        <AnnualStatisticsStyled>
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
                    <ColoredTd isPositive={totalProfit > BigInt(0)}>
                        {totalProfit < 0 ? " ▼" : " ▲"}
                        {formatBigInt(totalProfit)}
                    </ColoredTd>
                </tr>
            </tbody>
        </AnnualStatisticsStyled>
    );
};
