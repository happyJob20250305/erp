import { ExpenseListProvider } from "../../api/Provider/AccountProvider/ExpenseListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ExpenseListMain } from "../../components/page/Account/ExpenseList/ExpenseListMain/ExpenseListMain";
import { ExpenseListSearch } from "../../components/page/Account/ExpenseList/ExpenseListSearch/ExpenseListSearch";

export const ExpenseList = () => {
    return (
        <ExpenseListProvider>
            <ContentBox variant='primary' fontSize='large'>
                지출결의서 조회 및 신청
            </ContentBox>
            <ExpenseListSearch />
            <ExpenseListMain />
        </ExpenseListProvider>
    );
};
