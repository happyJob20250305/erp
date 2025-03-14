import React, { createContext, FC, useState } from "react";

//초기값의 타입
interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

// 다른 컴포넌트에서 사용이 가능한 context를 만든다.
export const ReceivablesListContext = createContext<ISearchKeyword>({});

export const ReceivablesListProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});

    return (
        <ReceivablesListContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </ReceivablesListContext.Provider>
    );
};
