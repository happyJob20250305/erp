import React, { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const ClientListContext = createContext<ISearchKeyword>({});

export const ClientListProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <ClientListContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</ClientListContext.Provider>
    );
};
