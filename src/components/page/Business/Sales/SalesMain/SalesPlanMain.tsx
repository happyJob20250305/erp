import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { SalesPlanMainStyled } from "./styled";
import { SalesPlanContext } from "../../../../../api/Provider/SalesPlanProvider";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { Portal } from "../../../../common/potal/Portal";
import { SalesModal } from "../SalesModal/SalesModal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

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
    const { searchKeyword } = useContext(SalesPlanContext);
    const [salesPlanList, setSalesPlanList] = useState<ISalesPlan[]>([]);
    const [planNum, setPlanNum] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    const columns = [
        { key: "target_date", title: "목표날짜" },
        { key: "client_name", title: "거래처 이름" },
        { key: "name", title: "재조업체" },
        { key: "group_name", title: "대분류" },
        { key: "detail_name", title: "소분류" },
        { key: "product_name", title: "제품명" },
        { key: "goal_quanti", title: "목표수량" },
        { key: "plan_memo", title: "비고" },
    ] as Column<ISalesPlan>[];

    useEffect(() => {
        searchSalesPlanList();
    }, [searchKeyword]);

    const searchSalesPlanList = () => {
        axios
            .post("/business/sales-plan/searchPlanListBody.do", {
                ...searchKeyword,
            })
            .then((res: AxiosResponse<ISalesPlanResponse>) => {
                setSalesPlanList(res.data.searchPlanList);
            });
    };

    const postSucces = () => {
        setModal(!modal);
        searchSalesPlanList();
    };

    return (
        <SalesPlanMainStyled>
            <StyledTable data={salesPlanList} columns={columns} hoverable={true} fullWidth={true} />

            {modal && (
                <Portal>
                    <SalesModal planNum={planNum} setPlanNum={setPlanNum} postSucces={postSucces} />
                </Portal>
            )}
        </SalesPlanMainStyled>
    );
};
