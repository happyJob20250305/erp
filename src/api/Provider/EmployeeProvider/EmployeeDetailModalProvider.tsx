import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface IEmployeeDetailModalKeywordContext {
    employeeDetailModalKeyword?: object;
    setEmployeeDetailModalKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const EmployeeDetailModalContext = createContext<IEmployeeDetailModalKeywordContext>({});

// Provider 컴포넌트
export const EmployeeDetailProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [employeeDetailModalKeyword, setEmployeeDetailModalKeyword] = useState<object>({});

    return (
        <EmployeeDetailModalContext.Provider value={{ employeeDetailModalKeyword, setEmployeeDetailModalKeyword }}>
            {children}
        </EmployeeDetailModalContext.Provider>
    );
};
