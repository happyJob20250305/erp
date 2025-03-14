import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IAnnual, IAnnualListBodyResponse } from "../../../../../models/interface/sales/IAnnual";
import { useRecoilState } from "recoil";
import { searchApi } from "../../../../../api/SalesApi/AnnualApi/searchApi";
import { Annual } from "../../../../../api/api";
import { modalState } from "../../../../../stores/modalState";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { Portal } from "../../../../common/potal/Portal";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { AnnualModal } from "../AnnualModal/AnnualModal";
import { AnnualChart } from "../AnnualChart/AnnualChart";
import { AnnualStatistics } from "../AnnualStatistics/AnnualStatistics";

export const AnnualMain = () => {
    const { search } = useLocation();
    const [annualList, setAnnualList] = useState<IAnnual[]>([]);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [modalType, setModalType] = useState<"product" | "client">("product");

    useEffect(() => {
        searchAnnualList();
    }, [search]);

    const searchAnnualList = async () => {
        const searchParam = new URLSearchParams(search);

        const result = await searchApi<IAnnualListBodyResponse>(Annual.search, searchParam);
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
            <AnnualChart annualListChart={annualList}></AnnualChart>
            <AnnualStatistics annualStatistics={annualList}></AnnualStatistics>
            <StyledButton onClick={() => annualModal("product")}>매출상위제품</StyledButton>
            <StyledButton onClick={() => annualModal("client")}>매출상위기업</StyledButton>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>년도</StyledTh>
                        <StyledTh>주문 건수</StyledTh>
                        <StyledTh>매출</StyledTh>
                        <StyledTh>매출 원가</StyledTh>
                        <StyledTh>지출</StyledTh>
                        <StyledTh>미수금</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {annualList?.length > 0 ? (
                        annualList.map((annual) => {
                            return (
                                <>
                                    <tr key={annual.orderDate}>
                                        <StyledTd>{annual.orderDate}</StyledTd>
                                        <StyledTd>{annual.orderCount.toString()}</StyledTd>
                                        <StyledTd>{annual.totalSupplyPrice.toString()}</StyledTd>
                                        <StyledTd>{annual.totalUnitPrice.toString()}</StyledTd>
                                        <StyledTd>{annual.totalExpenseAmount.toString()}</StyledTd>
                                        <StyledTd>{annual.totalReceivableAmount.toString()}</StyledTd>
                                    </tr>
                                </>
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
                    <AnnualModal postSuccess={postSuccess} modalType={modalType} />
                </Portal>
            )}
        </>
    );
};
