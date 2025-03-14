import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const OrderListContext = createContext<ISearchKeyword>({});

export const OrderListProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <OrderListContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</OrderListContext.Provider>
    );
};
