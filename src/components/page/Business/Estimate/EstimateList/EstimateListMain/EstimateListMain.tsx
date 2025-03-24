import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { EstimateListMainStyled } from "./styled";
import { PageNavigate } from "../../../../../common/pageNavigation/PageNavigate";
import { EstimateListContext } from "../../../../../../api/Provider/EstimateListProvider";
import { Portal } from "../../../../../common/potal/Portal";
import { EstimateListModal } from "../EstimateListModal/EstimateListModal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { StyledTable, StyledTd, StyledTh } from "../../../../../common/styled/StyledTable";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";

export interface IEstimate {
    id: number;
    clientId: number;
    empId: number;
    departmentCode: null;
    estimateEmpName: string;
    estimateDate: string;
    deliveryDate: string;
    clientName: string;
    productName: string;
    totalDeliveryCount: number;
    totalSupplyPrice: number;
    totalTax: number;
    salesArea: string;
}

export interface IEstimateListResponse {
    estimateList: IEstimate[];
    estimateCnt: number;
}

export const EstimateListMain = () => {
    const [estimateList, setEstimateList] = useState<IEstimate[]>([]);
    const [estimateCount, setEstimateCount] = useState<number>(0);
    const [cPage, setCpage] = useState<number>(0);

    const { searchKeyword } = useContext(EstimateListContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [estimateId, setEstimateId] = useState<number>();
    const [clientId, setClientId] = useState<number>();

    useEffect(() => {
        searchEstimateList();
    }, [searchKeyword]);

    const searchEstimateList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/business/estimate-list/estimateListBody.do", {
                ...searchKeyword,
                currentPage,
                pageSize: 5,
            })
            .then((res: AxiosResponse<IEstimateListResponse>) => {
                setEstimateList(res.data.estimateList);
                setEstimateCount(res.data.estimateCnt);
                setCpage(currentPage);
            });
    };

    const handlerOrderListModal = (id: number, clientId: number) => {
        setModal(!modal);
        setEstimateId(id);
        setClientId(clientId);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchEstimateList();
    };
    return (
        <EstimateListMainStyled>
            <>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>견적직원</StyledTh>
                            <StyledTh>견적날짜</StyledTh>
                            <StyledTh>거래처</StyledTh>
                            <StyledTh>제품</StyledTh>
                            <StyledTh>납기날짜</StyledTh>
                            <StyledTh>총납품개수</StyledTh>
                            <StyledTh>총공급가액</StyledTh>
                            <StyledTh>총세액</StyledTh>
                            <StyledTh>영역구분(scm/영업)</StyledTh>
                            <StyledTh>견적상세조회</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {estimateList?.length > 0 ? (
                            estimateList.map((estimate) => {
                                return (
                                    <tr key={estimate?.id}>
                                        <StyledTd>{estimate?.estimateEmpName}</StyledTd>
                                        <StyledTd>{estimate?.estimateDate}</StyledTd>
                                        <StyledTd>{estimate?.clientName}</StyledTd>
                                        <StyledTd>{estimate?.productName}</StyledTd>
                                        <StyledTd>{estimate?.deliveryDate}</StyledTd>
                                        <StyledTd>{estimate?.totalDeliveryCount}</StyledTd>
                                        <StyledTd>{estimate?.totalSupplyPrice}</StyledTd>
                                        <StyledTd>{estimate?.totalTax}</StyledTd>
                                        <StyledTd>{estimate?.salesArea}</StyledTd>
                                        <StyledTd>
                                            <StyledButton
                                                onClick={() => handlerOrderListModal(estimate?.id, estimate?.clientId)}
                                            >
                                                견적서상세보기
                                            </StyledButton>
                                        </StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <StyledTd colSpan={10}>조회 내역이 없습니다.</StyledTd>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </>
            <PageNavigate
                totalItemsCount={estimateCount}
                onChange={searchEstimateList}
                itemsCountPerPage={5}
                activePage={cPage}
            />

            {modal && (
                <Portal>
                    <EstimateListModal
                        estimateId={estimateId}
                        setEstimateId={setEstimateId}
                        clientId={clientId}
                        setClientId={setClientId}
                        postSuccess={postSuccess}
                    />
                </Portal>
            )}
        </EstimateListMainStyled>
    );
};
