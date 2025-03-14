import { IMonthly } from "../../../../../models/interface/IMonthly";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

interface MonthlyStatisticsProps {
    monthlyStatistics: IMonthly[];
}

const formatBigInt = (value: bigint) => {
    return new Intl.NumberFormat("ko-KR").format(value);
};

export const MonthlyStatistics = ({ monthlyStatistics }: MonthlyStatisticsProps) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <StyledTh></StyledTh>
                    <StyledTh>금액합계(단위: 원)</StyledTh>
                </tr>
            </thead>
            <tbody>
                {monthlyStatistics.length > 0 ? (
                    monthlyStatistics.map((monthly) => {
                        return (
                            <>
                                <tr>
                                    <StyledTd>매출 순수익 ①</StyledTd>
                                    <StyledTd>
                                        {formatBigInt(monthly.totalSupplyPrice - monthly.totalUnitPrice)} 원
                                    </StyledTd>
                                </tr>
                                <tr>
                                    <StyledTd>지출 총액 ②</StyledTd>
                                    <StyledTd>{formatBigInt(monthly.totalExpenseAmount)} 원</StyledTd>
                                </tr>
                                <tr>
                                    <StyledTd>미수금 총액 ③</StyledTd>
                                    <StyledTd>{formatBigInt(monthly.totalReceivableAmount)} 원</StyledTd>
                                </tr>
                                <tr>
                                    <StyledTd>손익 총계 (①-②-③)</StyledTd>
                                    <StyledTd>
                                        {monthly.totalRevenueAmount < 0 ? "▲ " : "▼ "}
                                        {formatBigInt(
                                            monthly.totalSupplyPrice -
                                                monthly.totalExpenseAmount -
                                                monthly.totalReceivableAmount
                                        )}
                                        원
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
