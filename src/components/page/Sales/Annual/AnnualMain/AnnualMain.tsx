import { useContext, useEffect, useState } from "react";
import { IAnnual, IAnnualListBodyResponse } from "../../../../../models/interface/sales/IAnnual";
import { useRecoilState } from "recoil";
import { searchApi } from "../../../../../api/SalesApi/AnnualApi/searchApi";
import { Annual } from "../../../../../api/api";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { AnnualModal } from "../AnnualModal/AnnualModal";
import { AnnualChart } from "../AnnualChart/AnnualChart";
import { AnnualStatistics } from "../AnnualStatistics/AnnualStatistics";
import { AnnualListContext } from "../../../../../api/Provider/SalesProvider/AnnualProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { ChartContainer, ChartWrapper, StatisticsWrapper } from "../../Daily/DailyMain/styled";

export const AnnualMain = () => {
    const { searchKeyword } = useContext(AnnualListContext);
    const [annualList, setAnnualList] = useState<IAnnual[]>([]);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [modalType, setModalType] = useState<"product" | "client">("product");

    const columns = [
        { key: "orderDate", title: "년도" },
        { key: "orderCount", title: "주문 건수" },
        { key: "totalSupplyPrice", title: "매출", isMoney: true },
        { key: "totalUnitPrice", title: "매출 원가", isMoney: true },
        { key: "totalExpenseAmount", title: "지출", isMoney: true },
        { key: "totalReceivableAmount", title: "미수금", isMoney: true },
    ] as Column<IAnnual>[];

    useEffect(() => {
        searchAnnualList();
    }, [searchKeyword]);

    const searchAnnualList = async () => {
        const result = await searchApi<IAnnualListBodyResponse>(Annual.search, {
            ...searchKeyword,
        });
        if (result && result.annualList) {
            setAnnualList(result.annualList);
        }
    };

    const annualModal = (type: "product" | "client") => {
        setModalType(type);
        setModal(!modal);
    };
    const postSuccess = () => {
        setModal(!modal);
        searchAnnualList();
    };

    return (
        <>
            <ChartContainer>
                <ChartWrapper>
                    <AnnualChart annualListChart={annualList} />
                </ChartWrapper>
                <StatisticsWrapper>
                    <AnnualStatistics annualStatistics={annualList} />
                </StatisticsWrapper>
            </ChartContainer>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <StyledButton onClick={() => annualModal("product")}>매출상위제품</StyledButton>
                <StyledButton onClick={() => annualModal("client")}>매출상위기업</StyledButton>
            </div>
            <StyledTable columns={columns} data={annualList} hoverable={true} fullWidth={true} />

            {modal && (
                <Portal>
                    <AnnualModal postSuccess={postSuccess} modalType={modalType} />
                </Portal>
            )}
        </>
    );
};
