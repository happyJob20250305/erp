import { IAnnual } from "../../../../../models/interface/sales/IAnnual";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

interface AnnualStatisticsProps {
    annualStatistics: IAnnual[];
}

const formatBigInt = (value: bigint) => {
    return new Intl.NumberFormat("ko-KR").format(value);
};

export const AnnualStatistics = ({ annualStatistics }: AnnualStatisticsProps) => {
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
                    annualStatistics.map((annual) => {
                        return (
                            <>
                                <tr>
                                    <StyledTd>매출 순수익 ①</StyledTd>
                                    <StyledTd>{formatBigInt(annual.totalSupplyPrice - annual.totalUnitPrice)}</StyledTd>
                                </tr>
                                <tr>
                                    <StyledTd>지출 총액 ②</StyledTd>
                                    <StyledTd>{formatBigInt(annual.totalExpenseAmount)} </StyledTd>
                                </tr>
                                <tr>
                                    <StyledTd>미수금 총액 ③</StyledTd>
                                    <StyledTd>{formatBigInt(annual.totalReceivableAmount)} </StyledTd>
                                </tr>
                                <tr>
                                    <StyledTd>손익 총계 (①-②-③)</StyledTd>
                                    <StyledTd>
                                        {annual.totalRevenueAmount < 0 ? "▲ " : "▼ "}
                                        {formatBigInt(
                                            annual.totalSupplyPrice -
                                                annual.totalExpenseAmount -
                                                annual.totalReceivableAmount
                                        )}
                                    </StyledTd>
                                </tr>
                            </>
                        );
                    })
                ) : (
                    <tr>
                        <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                    </tr>
                )}
            </tbody>
        </StyledTable>
    );
};
