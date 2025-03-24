import { useContext, useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import { ISales, ISalesResponse } from "../../../../../../models/interface/business/sales/ISales";
import { SalesResultListMainStyled } from "./styled";
import { SalesResultListContext } from "../../../../../../api/Provider/SalesResultProvider";
import { PageNavigate } from "../../../../../common/pageNavigation/PageNavigate";
import { StyledTable } from "../../../../../common/styled/StyledTable";

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
        <SalesResultListMainStyled>
            <>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>목표날짜</th>
                            <th>거래처</th>
                            <th>제조업체</th>
                            <th>대분류</th>
                            <th>소분류</th>
                            <th>제품</th>
                            <th>목표수량</th>
                            <th>실적수량</th>
                            <th>실적</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesResultList?.length > 0 ? (
                            salesResultList.map((salesResult) => {
                                return (
                                    <tr key={salesResult?.plan_num}>
                                        <td>{salesResult?.target_date}</td>
                                        <td>{salesResult?.client_name}</td>
                                        <td>{salesResult?.name}</td>
                                        <td>{salesResult?.group_name}</td>
                                        <td>{salesResult?.detail_name}</td>
                                        <td>{salesResult?.product_name}</td>
                                        <td>{salesResult?.goal_quanti}</td>
                                        <td>{salesResult?.perform_qut}</td>
                                        <td>{(salesResult?.perform_qut / salesResult?.goal_quanti) * 100}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={9}>조회 내역이 없습니다.</td>
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
        </SalesResultListMainStyled>
    );
};
