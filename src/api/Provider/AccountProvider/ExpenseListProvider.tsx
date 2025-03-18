import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const ExpenseListContext = createContext<ISearchKeyword>({});

export const ExpenseListProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <ExpenseListContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </ExpenseListContext.Provider>
    );
};
