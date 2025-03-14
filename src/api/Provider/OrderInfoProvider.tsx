import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const OrderInfoContext = createContext<ISearchKeyword>({});

export const OrderInfoProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <OrderInfoContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</OrderInfoContext.Provider>
    );
};
