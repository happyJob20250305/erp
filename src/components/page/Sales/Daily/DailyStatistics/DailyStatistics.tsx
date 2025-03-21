import { IDaily } from "../../../../../models/interface/sales/IDaily";
import { StyledTable } from "../../../../common/styled/StyledTable";
import { ColoredTd, DailyStatisticsStyled, StyledTd, StyledTh } from "./styled";

interface DailyStatisticsProps {
    dailyStatistics: IDaily;
}

const formatBigInt = (value: bigint) => {
    return new Intl.NumberFormat("ko-KR").format(value);
};

export const DailyStatistics = ({ dailyStatistics }: DailyStatisticsProps) => {
    if (!dailyStatistics) {
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

    const { totalSupplyPrice, totalExpenseAmount } = dailyStatistics;
    const totalRevenueAmount: bigint = BigInt(totalSupplyPrice) - BigInt(totalExpenseAmount);

    return (
        <DailyStatisticsStyled>
            <thead>
                <tr>
                    <StyledTh></StyledTh>
                    <StyledTh>금액합계(단위: 원)</StyledTh>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <StyledTd>매출총액 ①</StyledTd>
                    <StyledTd>{formatBigInt(totalSupplyPrice)} </StyledTd>
                </tr>
                <tr>
                    <StyledTd>지출총액 ②</StyledTd>
                    <StyledTd>{formatBigInt(totalExpenseAmount)} </StyledTd>
                </tr>
                <tr>
                    <StyledTd>손익총계 (①-②)</StyledTd>
                    <ColoredTd isPositive={totalRevenueAmount > BigInt(0)}>
                        {formatBigInt(totalRevenueAmount)}
                    </ColoredTd>
                </tr>
            </tbody>
        </DailyStatisticsStyled>
    );
};
