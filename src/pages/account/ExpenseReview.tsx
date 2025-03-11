import { ExpenseReviewProvider } from "../../api/Provider/ExpenseReviewProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ExpenseReviewMain } from "../../components/page/Account/ExpenseReview/ExpenseReviewMain/ExpenseReviewMain";
import { ExpenseReviewSearch } from "../../components/page/Account/ExpenseReview/ExpenseReviewSearch/ExpenseReviewSearch";

export const ExpenseReview = () => {
    return (
        <ExpenseReviewProvider>
            <ContentBox variant='primary' fontSize='large'>
                지출결의서 신청
            </ContentBox>
            <ExpenseReviewSearch />
            <ExpenseReviewMain />
        </ExpenseReviewProvider>
    );
};
