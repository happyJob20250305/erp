import { useState } from "react";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { PromotionMain } from "../../components/page/Personnel/promotion/PromotionMain/PromotionMain";
import { PromotionSearch } from "../../components/page/Personnel/promotion/PromotionSearch/PromotionSearch";
import { PromotionDetail } from "../../components/page/Personnel/promotion/PromotionDetail/PromotionDetail";
import { PromotionSearchProvider } from "../../api/Provider/PromitionProvider/PromotionSearhProvider";

export const Promotion = () => {
    const [selectedSearchEmployeeNumber, setSelectedSearchEmployeeNumber] = useState<number>();

    const handleSearch = (data: number) => {
        setSelectedSearchEmployeeNumber(data);
    };

    return (
        <PromotionSearchProvider>
            <ContentBox variant='primary' fontSize='large'>
                승진내역 관리
            </ContentBox>
            <PromotionSearch></PromotionSearch>
            <PromotionMain onSelectEmployee={handleSearch} />
            <PromotionDetail data={selectedSearchEmployeeNumber} />
        </PromotionSearchProvider>
    );
};
