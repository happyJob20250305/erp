import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useContext, useEffect, useState } from "react";
import { IReceivablesList, IReceivablesListResponse } from "../../../../../models/interface/sales/IReceivablesList";
import { searchApi } from "../../../../../api/SalesApi/ReceivablesListApi/searchApi";
import { ReceivablesList } from "../../../../../api/api";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { ReceivablesModal } from "../ReceivablesModal/ReceivablesModal";
import { Portal } from "../../../../common/potal/Portal";
import { ReceivablesListContext } from "../../../../../api/Provider/SalesProvider/ReceivablesListProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";

export const ReceivablesListMain = () => {
    const { searchKeyword } = useContext(ReceivablesListContext);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [receivableList, setReceivableList] = useState<IReceivablesList[]>([]);
    const [receivableCount, setReceivableCount] = useState<number>(0);
    const [cPage, setCpage] = useState<number>(0);
    const [orderId, setOrderId] = useState<number>(0);

    const columns = [
        { key: "orderId", title: "주문번호" },
        { key: "departmentName", title: "처리부서" },
        { key: "clientName", title: "거래처" },
        { key: "productName", title: "제품명" },
        { key: "orderDate", title: "수주일자" },
        { key: "deliveryDate", title: "배송일자" },
        {
            key: "receivableAmount",
            title: "미수금",
            render: (value) =>
                value
                    ? new Intl.NumberFormat("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                      }).format(value)
                    : "0",
        },
        {
            key: "receivableStatus",
            title: "수금상태",
            render: (value) => (value && value.trim() !== "" ? "수금" : "미수금"),
        },
        {
            key: "managerName",
            title: "처리자",
            render: (value) => (value && value.trim() !== "" ? value : "자동처리"),
        },
    ] as Column<IReceivablesList>[];

    useEffect(() => {
        searchReceivablesList();
    }, [searchKeyword]);

    const searchReceivablesList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IReceivablesListResponse>(ReceivablesList.search, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

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
            <StyledTable
                columns={columns}
                data={receivableList}
                hoverable={true}
                fullWidth={true}
                onCellClick={(row, column) => {
                    handlerModal(row.orderId);
                }}
            />

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
