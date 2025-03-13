import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const SalesResultContext = createContext<ISearchKeyword>({});

export const SalesResultProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <SalesResultContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </SalesResultContext.Provider>
    );
};
