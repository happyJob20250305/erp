import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMonthly, IMonthlyListBodyResponse } from "../../../../../models/interface/IMonthly";
import { searchApi } from "../../../../../api/MonthlyApi/searchApi";
import { Monthly } from "../../../../../api/api";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { MonthlyChart } from "../MonthlyChart/MonthlyChart";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import Portal from "react-datepicker/dist/portal";
import { MonthlyModal } from "../MonthlyModal/MonthlyModal";

export const MonthlyMain = () => {
    const { search } = useLocation();
    const [monthlyList, setMonthlyList] = useState<IMonthly[]>([]);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        searchMonthlyList();
    }, [search]);

    const searchMonthlyList = async () => {
        const searchParam = new URLSearchParams(search);

        const result = await searchApi<IMonthlyListBodyResponse>(Monthly.search, searchParam);
        if (result && result.monthlyList) {
            setMonthlyList(result.monthlyList);
        }
    };
    const monthlyModal = () => {
        setModal(!modal);
    };
    return (
        <>
            <MonthlyChart monthlyListChart={monthlyList}></MonthlyChart>
            <StyledButton onClick={() => monthlyModal()}>매출상위제품</StyledButton>
            <StyledButton>메출상위기업</StyledButton>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>날짜</StyledTh>
                        <StyledTh>주문 건수</StyledTh>
                        <StyledTh>매출</StyledTh>
                        <StyledTh>매출 원가</StyledTh>
                        <StyledTh>지출</StyledTh>
                        <StyledTh>미수금</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {monthlyList?.length > 0 ? (
                        monthlyList.map((monthly) => {
                            return (
                                <tr key={monthly.orderDate}>
                                    <StyledTd>{monthly.orderDate}</StyledTd>
                                    <StyledTd>{monthly.orderCount.toString()}</StyledTd>
                                    <StyledTd>{monthly.totalSupplyPrice.toString()}</StyledTd>
                                    <StyledTd>{monthly.totalUnitPrice.toString()}</StyledTd>
                                    <StyledTd>{monthly.totalExpenseAmount.toString()}</StyledTd>
                                    <StyledTd>{monthly.totalReceivableAmount.toString()}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={6}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            {modal && (
                <Portal>
                    <MonthlyModal></MonthlyModal>
                </Portal>
            )}
        </>
    );
};
