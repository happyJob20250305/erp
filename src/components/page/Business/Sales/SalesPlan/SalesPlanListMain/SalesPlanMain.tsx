import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../../common/StyledTable/StyledTable";
import { SalesPlanListContext } from "../../../../../../api/Provider/SalesPlanProvider";
import { useRecoilState } from "recoil";
import { Portal } from "../../../../../common/potal/Portal";
import { modalState } from "../../../../../../stores/modalState";
import { SalesPlanListMainStyled } from "./styled";
import { SalesPlanListModal } from "../SalesPlanModal/SalesPlanListModal";
import { ISales, ISalesResponse } from "../../../../../../models/interface/business/sales/ISales";

export const SalesPlanListMain = () => {
    const [salesPlanList, setSalesPlanList] = useState<ISales[]>([]);
    const [selectPlanNum, setSelectPlanNum] = useState<number>(0);

    const { searchKeyword } = useContext(SalesPlanListContext);
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
    ] as Column<ISales>[];

    const searchSalesPlanList = () => {
        axios
            .post("/business/sales-plan/searchPlanListBody.do", {
                ...searchKeyword,
            })
            .then((res: AxiosResponse<ISalesResponse>) => {
                setSalesPlanList(res.data.searchPlanList);
            });
    };

    const handlerSalesPlanModal = (planNum: number) => {
        setModal(!modal);
        setSelectPlanNum(planNum);
    };

    const postSucces = () => {
        setModal(!modal);
        searchSalesPlanList();
    };

    return (
        <SalesPlanListMainStyled>
            <StyledTable
                data={salesPlanList}
                columns={columns}
                hoverable={true}
                fullWidth={true}
                onCellClick={(row) => {
                    handlerSalesPlanModal(row.plan_num);
                }}
            />

            {modal && (
                <Portal>
                    <SalesPlanListModal
                        planNum={selectPlanNum}
                        setPlanNum={setSelectPlanNum}
                        postSuccess={postSucces}
                    />
                </Portal>
            )}
        </SalesPlanListMainStyled>
    );
};
