import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useEffect, useState } from "react";
import { IReceivablesList, IReceivablesListResponse } from "../../../../../models/interface/sales/IReceivablesList";
import { searchApi } from "../../../../../api/SalesApi/ReceivablesListApi/searchApi";
import { ReceivablesList } from "../../../../../api/api";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { ReceivablesModal } from "../ReceivablesModal/ReceivablesModal";
import { Portal } from "../../../../common/potal/Portal";

export const ReceivablesListMain = () => {
    const { search } = useLocation();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [receivableList, setReceivableList] = useState<IReceivablesList[]>([]);
    const [receivableCount, setReceivableCount] = useState<number>(0);
    const [cPage, setCpage] = useState<number>(0);
    const [orderId, setOrderId] = useState<number>(0);

    useEffect(() => {
        searchReceivablesList();
    }, [search]);

    const searchReceivablesList = async (currentPage?: number) => {
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams(search);
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        const result = await searchApi<IReceivablesListResponse, URLSearchParams>(ReceivablesList.search, searchParam);

        if (result) {
            setReceivableList(result.receivableList);
            setReceivableCount(result.receivableCnt);
            setCpage(currentPage);
        }
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setOrderId(id);
    };
    const postSuccess = () => {
        setModal(!modal);
        searchReceivablesList(cPage);
    };

    return (
        <>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>주문번호</StyledTh>
                        <StyledTh>처리부서</StyledTh>
                        <StyledTh>거래처</StyledTh>
                        <StyledTh>제품명</StyledTh>
                        <StyledTh>수주일자</StyledTh>
                        <StyledTh>배송일자</StyledTh>
                        <StyledTh>미수금</StyledTh>
                        <StyledTh>수금상태</StyledTh>
                        <StyledTh>처리자</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {receivableList?.length > 0 ? (
                        receivableList.map((receivable) => {
                            return (
                                <tr key={receivable.orderId} onClick={() => handlerModal(receivable.orderId)}>
                                    <StyledTd>{receivable.orderId}</StyledTd>
                                    <StyledTd>{receivable.departmentName}</StyledTd>
                                    <StyledTd>{receivable.clientName}</StyledTd>
                                    <StyledTd>{receivable.productName}</StyledTd>
                                    <StyledTd>{receivable.orderDate}</StyledTd>
                                    <StyledTd>{receivable.deliveryDate}</StyledTd>
                                    <StyledTd>{receivable.receivableAmount}</StyledTd>
                                    <StyledTd>{receivable.receivableStatus}</StyledTd>
                                    <StyledTd>{receivable.managerName}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={8}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={receivableCount}
                onChange={searchReceivablesList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <ReceivablesModal orderId={orderId} setOrderId={setOrderId} postSuccess={postSuccess} />
                </Portal>
            )}
        </>
    );
};
