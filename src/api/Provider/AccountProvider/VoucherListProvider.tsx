import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const VoucherListContext = createContext<ISearchKeyword>({});

export const VoucherListProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <VoucherListContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </VoucherListContext.Provider>
    );
};
