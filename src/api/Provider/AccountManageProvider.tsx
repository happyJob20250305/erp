import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const AccountManageContext = createContext<ISearchKeyword>({});

export const AccountManageProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <AccountManageContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </AccountManageContext.Provider>
    );
};
