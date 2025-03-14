import { useLocation } from "react-router-dom";
import { ExpenseReviewProvider } from "../../api/Provider/ExpenseReviewProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ExpenseReviewMain } from "../../components/page/Account/ExpenseReview/ExpenseReviewMain/ExpenseReviewMain";
import { ExpenseReviewSearch } from "../../components/page/Account/ExpenseReview/ExpenseReviewSearch/ExpenseReviewSearch";

export const ExpenseReview = () => {
    const location = useLocation();
    const isReview = location.pathname.includes("expense-review");
    const isApproval = location.pathname.includes("expense-approval");
    return (
        <ExpenseReviewProvider>
            <ContentBox variant='primary' fontSize='large'>
                {isReview && "지출결의서 검토"}
                {isApproval && "지출결의서 승인"}
            </ContentBox>
            <ExpenseReviewSearch />
            <ExpenseReviewMain />
        </ExpenseReviewProvider>
    );
};
