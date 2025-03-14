import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const SalesResultListContext = createContext<ISearchKeyword>({});

export const SalesResultListProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <SalesResultListContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </SalesResultListContext.Provider>
    );
};
