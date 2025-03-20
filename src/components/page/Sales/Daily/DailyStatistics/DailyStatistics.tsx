import { IDaily } from "../../../../../models/interface/sales/IDaily";
import { StyledTable, StyledTd } from "../../../../common/styled/StyledTable";
import { DailyStatisticsStyled, StyledTh } from "./styled";

interface DailyStatisticsProps {
    dailyStatistics: IDaily;
}

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

    const { totalSupplyPrice, totalExpenseAmount, totalRevenueAmount } = dailyStatistics;

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
                    <StyledTd>{totalSupplyPrice.toString()} </StyledTd>
                </tr>
                <tr>
                    <StyledTd>지출총액 ②</StyledTd>
                    <StyledTd>{totalExpenseAmount.toString()} </StyledTd>
                </tr>
                <tr>
                    <StyledTd>손익총계 (①-②)</StyledTd>
                    <StyledTd>{totalRevenueAmount.toString()} </StyledTd>
                </tr>
            </tbody>
        </DailyStatisticsStyled>
    );
};
