import {
    IPromotionList,
    IPromotionListResponse,
} from "../../../../../models/interface/personnel/promotion/IPromotionList";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { Promotion } from "../../../../../api/api";
import { useContext, useEffect, useState } from "react";

import { PromotionSearchContext } from "../../../../../api/Provider/PromitionProvider/PromotionSearhProvider";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { PromotionMainStyled } from "./styled";

interface PromotionMainProps {
    onSelectEmployee: (employeeNumber: number) => void;
}

export const PromotionMain = ({ onSelectEmployee }: PromotionMainProps) => {
    const [promotionList, setPromotionList] = useState<IPromotionList[]>([]);
    const [promitionCnt, setPromitionCnt] = useState<number>(1);
    // context 상태 및 업데이트 함수 가져오기
    const { searchKeyword } = useContext(PromotionSearchContext);

    const [cPage, setCPage] = useState<number>(1);
    const columns = [
        { key: "employeeNumber", title: "사번" },
        { key: "employeeName", title: "사원명" },
        { key: "departmentCode", title: "부서코드" },
        { key: "departmentDetailName", title: "부서명" },
        { key: "jobGrade", title: "직급" },
        { key: "createdAt", title: "발령일자" },
    ] as unknown as Column<IPromotionList>[];

    useEffect(() => {
        PromotionList();
    }, [searchKeyword]);

    const PromotionList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IPromotionListResponse>(Promotion.promitionList, {
            ...searchKeyword,
        });

        if (result) {
            setPromotionList(result.promotionList);
            setPromitionCnt(result.promotionCnt);
            setCPage(currentPage);
        }
    };

    return (
        <>
            <PromotionMainStyled>
                <StyledTable
                    data={promotionList}
                    columns={columns}
                    fullWidth={true}
                    hoverable={true}
                    onCellClick={(row, columns) => {
                        onSelectEmployee(row.employeeNumber);
                    }}
                />

                <PageNavigate
                    totalItemsCount={promitionCnt}
                    onChange={setCPage}
                    activePage={cPage}
                    itemsCountPerPage={5}
                />
            </PromotionMainStyled>
        </>
    );
};
