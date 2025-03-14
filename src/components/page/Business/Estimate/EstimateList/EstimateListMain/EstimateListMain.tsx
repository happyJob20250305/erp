import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { EstimateListMainStyled } from "./styled";
import { Column, StyledTable } from "../../../../../common/StyledTable/StyledTable";
import { PageNavigate } from "../../../../../common/pageNavigation/PageNavigate";
import { EstimateListContext } from "../../../../../../api/Provider/EstimateListProvider";

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

export interface IEstimateResponse {
    estimateList: IEstimate[];
    estimateCnt: number;
}

export const EstimateListMain = () => {
    const [estimateList, setEstimateList] = useState<IEstimate[]>([]);
    const [estimateCount, setEstimateCount] = useState<number>(0);
    const [cPage, setCpage] = useState<number>(0);

    const { searchKeyword } = useContext(EstimateListContext);

    useEffect(() => {
        searchEstimateList();
    }, [searchKeyword]);
    const columns = [
        { key: "estimateEmpName", title: "견적직원" },
        { key: "estimateDate", title: "견적날짜" },
        { key: "clientName", title: "거래처" },
        { key: "productName", title: "제품명" },
        { key: "deliveryDate", title: "납기날짜" },
        { key: "totalDeliveryCount", title: "총 납품 개수" },
        { key: "totalSupplyPrice", title: "총 공급 가액" },
        { key: "totalTax", title: "총 세액" },
        { key: "salesArea", title: "총 세액" },
        { key: "clientName", title: "영역구분(scm/영업)" },
        { key: "estimateDetail", title: "견적서상세조회" },
    ] as Column<IEstimate>[];

    const searchEstimateList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/business/estimate-list/estimateListBody.do", {
                ...searchKeyword,
                // searchEstimateDate: "",
                // searchDeliveryDate: "",
                // searchClientId: "",
                // searchProductId: "",
                currentPage,
                pageSize: 5,
            })
            .then((res: AxiosResponse<IEstimateResponse>) => {
                console.log("res.data:" + res.data.estimateList);
                setEstimateList(res.data.estimateList);
                setEstimateCount(res.data.estimateCnt);
                setCpage(currentPage);
            });
    };
    return (
        <EstimateListMainStyled>
            <StyledTable data={estimateList} columns={columns} hoverable={true} fullWidth={true} />
            <PageNavigate
                totalItemsCount={estimateCount}
                onChange={searchEstimateList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </EstimateListMainStyled>
    );
};
