import { IAnnual } from "../../../../../models/interface/IAnnual";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

interface AnnualStatisticsProps {
    annualStatistics: IAnnual[];
}

export const AnnualStatistics = ({ annualStatistics }: AnnualStatisticsProps) => {
    const { totalSupplyPrice, totalExpenseAmount, totalReceivableAmount, totalRevenueAmount } = annualStatistics[0];

    return (
        <StyledTable>
            <thead>
                <tr>
                    <StyledTh></StyledTh>
                    <StyledTh>금액합계(단위:원)</StyledTh>
                </tr>
            </thead>
            <tbody>
                {annualStatistics.length > 0 ? (
                    <>
                        <tr>
                            <StyledTd>매출 순수익 ①</StyledTd>
                            <StyledTd>{totalSupplyPrice.toLocaleString()} 원</StyledTd>
                        </tr>
                        <tr>
                            <StyledTd>지출 총액 ②</StyledTd>
                            <StyledTd>{totalExpenseAmount.toLocaleString()} 원</StyledTd>
                        </tr>
                        <tr>
                            <StyledTd>미수금 총액 ③</StyledTd>
                            <StyledTd>{totalReceivableAmount.toLocaleString()} 원</StyledTd>
                        </tr>
                        <tr>
                            <StyledTd>손익 총계 (①-②-③)</StyledTd>
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
