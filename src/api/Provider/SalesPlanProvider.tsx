import React, { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const SalesPlanListContext = createContext<ISearchKeyword>({});

export const SalesPlanListProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <SalesPlanListContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </SalesPlanListContext.Provider>
    );
};
