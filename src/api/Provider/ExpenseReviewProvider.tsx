import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const ExpenseReviewContext = createContext<ISearchKeyword>({});

export const ExpenseReviewProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <ExpenseReviewContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </ExpenseReviewContext.Provider>
    );
};
