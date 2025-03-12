import { IMonthly } from "../../../../../models/interface/IMonthly";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

interface MonthlyStatisticsProps {
    monthlyStatistics: IMonthly[];
}

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
                {monthlyStatistics.length>0?(
                    monthlyStatistics.map((monthly)=>{
                        <>
                            <tr>
                                <StyledTd>매출 순수익 ①</StyledTd>
                                <StyledTd>{monthly.totalSupplyAmount.toString()} 원</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>지출 총액 ②</StyledTd>
                                <StyledTd>{monthly.totalExpenseAmount.toString()} 원</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>미수금 총액 ③</StyledTd>
                                <StyledTd>{monthly.totalReceivableAmount.toString()} 원</StyledTd>
                            </tr>
                            <tr>
                                <StyledTd>손익 총계 (①-②-③)</StyledTd>
                                <StyledTd>{monthly.totalRevenueAmount.toString()} 원</StyledTd>
                            </tr>
                        </>
                    </tbody>

                    })
                )}
        </StyledTable>
    );
};
