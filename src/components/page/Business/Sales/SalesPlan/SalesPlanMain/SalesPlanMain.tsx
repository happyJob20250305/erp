import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../../common/StyledTable/StyledTable";
import { SalesPlanMainStyled } from "./styled";
import { ISalesPlan, ISalesPlanResponse } from "../../../../../../models/interface/personnel/Sales/ISales";
import { SalesPlanContext } from "../../../../../../api/Provider/SalesPlanProvider";
import { useRecoilState } from "recoil";
import { Portal } from "../../../../../common/potal/Portal";
import { modalState } from "../../../../../../stores/modalState";
import { SalesModal } from "../SalesPlanModal/SalesPlanModal";

export const SalesPlanMain = () => {
    const [salesPlanList, setSalesPlanList] = useState<ISalesPlan[]>([]);
    const [planNum, setPlanNum] = useState<ISalesPlan>();

    const { searchKeyword } = useContext(SalesPlanContext);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        searchSalesPlanList();
    }, [searchKeyword]);

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

    const searchSalesPlanList = () => {
        axios
            .post("/business/sales-plan/searchPlanListBody.do", {
                ...searchKeyword,
            })
            .then((res: AxiosResponse<ISalesPlanResponse>) => {
                setSalesPlanList(res.data.searchPlanList);
            });
    };

    const handlerSalesPlanModal = (row: ISalesPlan) => {
        setModal(!modal);
        setPlanNum(row);
    };

    const postSucces = () => {
        setModal(!modal);
        searchSalesPlanList();
    };

    return (
        <SalesPlanMainStyled>
            <StyledTable
                data={salesPlanList}
                columns={columns}
                hoverable={true}
                fullWidth={true}
                onCellClick={(row) => {
                    handlerSalesPlanModal(row);
                }}
            />

            {modal && (
                <Portal>
                    <SalesModal planNum={planNum} setPlanNum={setPlanNum} postSucces={postSucces} />
                </Portal>
            )}
        </SalesPlanMainStyled>
    );
};
