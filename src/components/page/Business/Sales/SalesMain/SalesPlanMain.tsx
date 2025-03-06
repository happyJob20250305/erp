import axios, { AxiosResponse } from "axios";
import { SalesPlanMainStyled } from "./styled";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SalesPlanContext } from "../../../../../api/Provider/SalesPlanProvider";

interface ISalesPlan {
    client_id: number;
    client_name: string;
    detail_code: string;
    detail_name: string;
    emp_id: number;
    emp_name: string;
    goal_quanti: number;
    group_name: string;
    industry_code: string;
    manufacturer_id: number;
    name: string;
    perform_qut: number;
    plan_memo: string;
    plan_num: number;
    product_name: string;
    target_date: string;
}

interface ISalesPlanResponse {
    searchPlanList: ISalesPlan[];
    salesCnt: number;
}

export const SalesPlanMain = () => {
    const { search } = useLocation();
    const { searchKeyword } = useContext(SalesPlanContext);
    const [salesPlanList, setSalesPlanList] = useState<ISalesPlan[]>([]);

    useEffect(() => {
        console.log(searchKeyword);
        searchSalesPlanList();
    }, [searchKeyword]);

    const searchSalesPlanList = () => {
        // const searchParam = new URLSearchParams(search);
        axios
            .post("/business/sales-plan/searchPlanListBody.do", {
                ...searchKeyword,
                // group_code: "MF001",
                // product_code: "MF00102",
                // target_date: "2025-02-20",
                // product_name: "뽀로로 병원놀이",
                // enterence: "yes",
            })
            // .then((res: AxiosResponse) => {
            .then((res: AxiosResponse<ISalesPlanResponse>) => {
                // console.log(res.data.searchPlanList);
                setSalesPlanList(res.data.searchPlanList);
            });
    };

    return (
        <SalesPlanMainStyled>
            <table>
                <colgroup>
                    <col style={{ width: "12.5%", height: "400px" }} />
                    <col style={{ width: "12.5%", height: "400px" }} />
                    <col style={{ width: "12.5%", height: "400px" }} />
                    <col style={{ width: "12.5%", height: "400px" }} />
                    <col style={{ width: "12.5%", height: "400px" }} />
                    <col style={{ width: "12.5%", height: "400px" }} />
                    <col style={{ width: "12.5%", height: "400px" }} />
                    <col style={{ width: "12.5%", height: "400px" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>목표날짜</th>
                        <th>거래처 이름</th>
                        <th>재조업체</th>
                        <th>대분류</th>
                        <th>소분류</th>
                        <th>제품명</th>
                        <th>목표수량</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {salesPlanList?.length > 0 ? (
                        salesPlanList.map((sales) => {
                            return (
                                <tr key={sales.plan_num}>
                                    <td>{sales.target_date}</td>
                                    <td>{sales.client_name}</td>
                                    <td>{sales.name}</td>
                                    <td>{sales.group_name}</td>
                                    <td>{sales.detail_name}</td>
                                    <td>{sales.product_name}</td>
                                    <td>{sales.goal_quanti}</td>
                                    <td>{sales.plan_memo}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={8}>검색 결과가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </SalesPlanMainStyled>
    );
};
