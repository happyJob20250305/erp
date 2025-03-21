import { useContext, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { ISales, ISalesResponse } from "../../../../../../models/interface/business/sales/ISales";
import { SalesResultMainListStyled } from "./styled";
import { SalesResultListContext } from "../../../../../../api/Provider/SalesResultProvider";
import { PageNavigate } from "../../../../../common/pageNavigation/PageNavigate";
import { StyledTable, StyledTd, StyledTh } from "../../../../../common/styled/StyledTable";

export const SalesResultMainList = () => {
    const [salesResultList, setSalesResultList] = useState<ISales[]>([]);
    const [salesResultCnt, setSalesResultCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    const { searchKeyword } = useContext(SalesResultListContext);

    useEffect(() => {
        searchSalesResultList();
    }, [searchKeyword]);

    const searchSalesResultList = (currentPage?: number) => {
        currentPage = currentPage || 1;

        axios
            .post("/business/sales-plan/searchPlanListBody.do", {
                ...searchKeyword,
                pageSize: 5,
                currentPage,
            })
            .then((res: AxiosResponse<ISalesResponse>) => {
                setSalesResultList(res.data.searchPlanList);
                setSalesResultCnt(res.data.salesPlanCnt);
                setCPage(currentPage);
            });
    };

    return (
        <SalesResultMainListStyled>
            <>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>목표날짜</StyledTh>
                            <StyledTh>거래처</StyledTh>
                            <StyledTh>제조업체</StyledTh>
                            <StyledTh>대분류</StyledTh>
                            <StyledTh>소분류</StyledTh>
                            <StyledTh>제품</StyledTh>
                            <StyledTh>목표수량</StyledTh>
                            <StyledTh>실적수량</StyledTh>
                            <StyledTh>실적</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {salesResultList?.length > 0 ? (
                            salesResultList.map((salesResult) => {
                                return (
                                    <tr key={salesResult?.plan_num}>
                                        <StyledTd>{salesResult?.target_date}</StyledTd>
                                        <StyledTd>{salesResult?.client_name}</StyledTd>
                                        <StyledTd>{salesResult?.name}</StyledTd>
                                        <StyledTd>{salesResult?.group_name}</StyledTd>
                                        <StyledTd>{salesResult?.detail_name}</StyledTd>
                                        <StyledTd>{salesResult?.product_name}</StyledTd>
                                        <StyledTd>{salesResult?.goal_quanti}</StyledTd>
                                        <StyledTd>{salesResult?.perform_qut}</StyledTd>
                                        <StyledTd>
                                            {(salesResult?.perform_qut / salesResult?.goal_quanti) * 100}
                                        </StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <StyledTd colSpan={9}>조회 내역이 없습니다.</StyledTd>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </>
            <PageNavigate
                totalItemsCount={salesResultCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchSalesResultList}
            />
        </SalesResultMainListStyled>
    );
};
