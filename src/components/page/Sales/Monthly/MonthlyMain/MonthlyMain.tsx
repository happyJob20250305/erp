import { useContext, useEffect, useState } from "react";
import { searchApi } from "../../../../../api/SalesApi/MonthlyApi/searchApi";
import { Monthly } from "../../../../../api/api";
import { MonthlyChart } from "../MonthlyChart/MonthlyChart";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { MonthlyModal } from "../MonthlyModal/MonthlyModal";
import { MonthlyStatistics } from "../MonthlyStatistics/MonthlyStatistics";
import { IMonthly, IMonthlyListBodyResponse } from "../../../../../models/interface/sales/IMonthly";
import { MonthlyListContext } from "../../../../../api/Provider/SalesProvider/MonthlyProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { ChartContainer, ChartWrapper, StatisticsWrapper } from "../../Daily/DailyMain/styled";

export const MonthlyMain = () => {
    const { searchKeyword } = useContext(MonthlyListContext);
    const [monthlyList, setMonthlyList] = useState<IMonthly[]>([]);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [modalType, setModalType] = useState<"product" | "client">("product");

    const columns = [
        { key: "orderDate", title: "날짜" },
        { key: "orderCount", title: "주문 건수" },
        { key: "totalSupplyPrice", title: "매출", isMoney: true },
        { key: "totalUnitPrice", title: "매출 원가", isMoney: true },
        { key: "totalExpenseAmount", title: "지출", isMoney: true },
        { key: "totalReceivableAmount", title: "미수금", isMoney: true },
    ] as Column<IMonthly>[];

    useEffect(() => {
        searchMonthlyList();
    }, [searchKeyword]);

    const searchMonthlyList = async () => {
        const result = await searchApi<IMonthlyListBodyResponse>(Monthly.search, {
            ...searchKeyword,
        });
        if (result && result.monthlyList) {
            setMonthlyList(result.monthlyList);
        }
    };
    const monthlyModal = (type: "product" | "client") => {
        setModalType(type);
        setModal(!modal);
    };
    const postSuccess = () => {
        setModal(!modal);
        searchMonthlyList();
    };
    return (
        <>
            <ChartContainer>
                <ChartWrapper>
                    <MonthlyChart monthlyListChart={monthlyList} />
                </ChartWrapper>
                <StatisticsWrapper>
                    <MonthlyStatistics monthlyStatistics={monthlyList} />
                </StatisticsWrapper>
            </ChartContainer>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <StyledButton onClick={() => monthlyModal("product")}>매출상위제품</StyledButton>
                <StyledButton onClick={() => monthlyModal("client")}>메출상위기업</StyledButton>
            </div>
            <StyledTable columns={columns} data={monthlyList} hoverable={true} fullWidth={true} />

            {modal && (
                <Portal>
                    <MonthlyModal postSuccess={postSuccess} modalType={modalType} />
                </Portal>
            )}
        </>
    );
};
