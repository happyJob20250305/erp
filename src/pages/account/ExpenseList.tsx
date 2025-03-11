import { ExpenseListProvider } from "../../api/Provider/ExpenseListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ExpenseListMain } from "../../components/page/Account/ExpenseList/ExpenseListMain/ExpenseListMain";
import { ExpenseListSearch } from "../../components/page/Account/ExpenseList/ExpenseListSearch/ExpenseListSearch";

export const ExpenseList = () => {
    return (
        <ExpenseListProvider>
            <ContentBox variant='primary' fontSize='large'>
                지출결의서 신청
            </ContentBox>
            <ExpenseListSearch />
            <ExpenseListMain />
        </ExpenseListProvider>
    );
};
