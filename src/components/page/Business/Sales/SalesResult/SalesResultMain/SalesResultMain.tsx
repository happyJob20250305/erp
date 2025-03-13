import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../../common/StyledTable/StyledTable";
import { SalesResultMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { SalesResultContext } from "../../../../../../api/Provider/SalesResultProvider";
import { ISales, ISalesResponse } from "../../../../../../models/interface/personnel/Sales/ISales";
import { SalesResult } from "../../../../../../pages/business/SalesResult";

interface INewSales extends ISales {
    perform_ratio: number;
}

export const SalesResultMain = () => {
    const [salesResultList, setSalesResultList] = useState<ISales[]>([]);

    const { searchKeyword } = useContext(SalesResultContext);

    useEffect(() => {
        searchSalesResultList();
        // 실적 계산 및 객체 key, value 추가 코드 -> 화면 전달은 아직 미수행 -> 추후 수정 추가 필요
        let addSalesResultList = new Array();
        for (let key in salesResultList) {
            // console.log(salesResultList[key]);
            let salesResultObj: any = salesResultList[key];
            salesResultObj.perform_ratio = (salesResultObj.perform_qut / salesResultObj.goal_quanti) * 100;

            addSalesResultList = salesResultList.map((salesResultObjValue: INewSales) => {
                return salesResultObj;
            });
        }
        console.log(
            "===================================================================================================="
        );
        console.log(addSalesResultList);
    }, [searchKeyword]);

    const columns = [
        { key: "target_date", title: "목표날짜" },
        { key: "client_name", title: "거래처 이름" },
        { key: "name", title: "재조업체" },
        { key: "group_name", title: "대분류" },
        { key: "detail_name", title: "소분류" },
        { key: "product_name", title: "제품명" },
        { key: "goal_quanti", title: "목표수량" },
        { key: "perform_qut", title: "실적수량" },
        { key: "perform_ratio", title: "실적" },
    ] as Column<ISales>[];

    const searchSalesResultList = () => {
        axios
            .post("/business/sales-plan/searchPlanListBody.do", { ...searchKeyword })
            .then((res: AxiosResponse<ISalesResponse>) => {
                setSalesResultList(res.data.searchPlanList);
            });
    };

    return (
        <SalesResultMainStyled>
            <StyledTable data={salesResultList} columns={columns} hoverable={true} fullWidth={true}></StyledTable>
        </SalesResultMainStyled>
    );
};
