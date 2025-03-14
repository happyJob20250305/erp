import { createContext, FC, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const EstimateListContext = createContext<ISearchKeyword>({});

export const EstimateListProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});
    return (
        <EstimateListContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </EstimateListContext.Provider>
    );
};
