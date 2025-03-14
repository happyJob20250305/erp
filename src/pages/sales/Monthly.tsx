import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { MonthlyMain } from "../../components/page/Sales/Monthly/MonthlyMain/MonthlyMain";
import { MonthlySearch } from "../../components/page/Sales/Monthly/MonthlySearch/MonthlySearch";

export const Monthly = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                매출관리
            </ContentBox>
            <MonthlySearch />
            <MonthlyMain />
        </>
    );
};
