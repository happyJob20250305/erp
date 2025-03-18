import { useEffect, useState } from "react";
import {
    IPromotionDetail,
    IPromotionDetailResponse,
    PromotionMainProps,
} from "../../../../../models/interface/personnel/promotion/IPromotionDetail";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { Promotion } from "../../../../../api/api";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { PromotionDetailStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const PromotionDetail = ({ data }: PromotionMainProps) => {
    const [promotionDetailList, setPromotionDetailList] = useState<IPromotionDetail[]>([]);
    const columns = [
        { key: "createdAt", title: "발령일자" },
        { key: "jobGrade", title: "발령내용" },
    ] as unknown as Column<IPromotionDetail>[];
    useEffect(() => {
        PromitionDetailList(data);
    }, [data]);

    const PromitionDetailList = async (data: number) => {
        const searchParam = new URLSearchParams();
        searchParam.append("currentPage", "1");
        searchParam.append("pageSize", "5");
        searchParam.append("employeeNumber", String(data));

        const result = await searchApi<IPromotionDetailResponse>(Promotion.promitionDetailList, searchParam);
        setPromotionDetailList(result.promotionDetailList);
    };

    const closeDetail = () => {
        setPromotionDetailList([]);
    };

    return (
        <>
            {promotionDetailList && promotionDetailList.length > 0 && (
                <PromotionDetailStyled>
                    <StyledButton size='small' onClick={closeDetail}>
                        닫기
                    </StyledButton>
                    <div className='info'>
                        <label>사번</label>
                        <StyledInput value={promotionDetailList[0]?.employeeNumber || ""} readOnly />
                        <label>사원명</label>
                        <StyledInput value={promotionDetailList[0]?.employeeName || ""} readOnly />
                        <label>부서명</label>
                        <StyledInput value={promotionDetailList[0]?.departmentDetailName || ""} readOnly />
                        <label>현재 직급</label>
                        <StyledInput value={promotionDetailList[0]?.recentJobGrade || ""} readOnly />
                    </div>
                    <StyledTable data={promotionDetailList} columns={columns} fullWidth={true} />
                </PromotionDetailStyled>
            )}
        </>
    );
};
