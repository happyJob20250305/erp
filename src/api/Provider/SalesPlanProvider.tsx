import React, { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const SalesPlanContext = createContext<ISearchKeyword>({});

export const SalesPlanListProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <SalesPlanContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</SalesPlanContext.Provider>
    );
};
