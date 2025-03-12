import { IAnnual } from "../../../../../models/interface/IAnnual";
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
                    <StyledTh>항목</StyledTh>
                    <StyledTh>금액합계(단위: 원)</StyledTh>
                </tr>
            </thead>
            <tbody>
                {annualStatistics.length > 0 ? (
                    annualStatistics.map((annual, index) => (
                        // <tr>을 반복문 안에 개별적으로 생성
                        <>
                            <tr key={index}>
                                <StyledTd>매출 순수익 ①</StyledTd>
                                <StyledTd>{formatBigInt(annual.totalSupplyPrice)} 원</StyledTd>
                            </tr>
                            <tr key={`${index}-expense`}>
                                <StyledTd>지출 총액 ②</StyledTd>
                                <StyledTd>{formatBigInt(annual.totalExpenseAmount)} 원</StyledTd>
                            </tr>
                            <tr key={`${index}-receivable`}>
                                <StyledTd>미수금 총액 ③</StyledTd>
                                <StyledTd>{formatBigInt(annual.totalReceivableAmount)} 원</StyledTd>
                            </tr>
                            <tr key={`${index}-revenue`}>
                                <StyledTd>손익 총계 (①-②-③)</StyledTd>
                                <StyledTd>{formatBigInt(annual.totalRevenueAmount)} 원</StyledTd>
                            </tr>
                        </>
                    ))
                ) : (
                    <tr>
                        <StyledTd colSpan={2}>데이터가 없습니다.</StyledTd>
                    </tr>
                )}
            </tbody>
        </StyledTable>
    );
};
