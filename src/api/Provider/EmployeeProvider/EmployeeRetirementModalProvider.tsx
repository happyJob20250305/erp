import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface IEmployeeRetirementModal {
    retireEmployeeId?: string;
    retireEmployeeNumber?: string;
    retireEmployeeName?: string;
    regDate?: string;
}

interface IEmployeeRetireKeyword {
    dispatchKeyword?: IEmployeeRetirementModal;
    setDispachKeyword?: React.Dispatch<React.SetStateAction<IEmployeeRetirementModal>>;
}

export const EmployeeRetirementModalContext = createContext<IEmployeeRetireKeyword>({});

// Provider 컴포넌트
export const EmployeeRetirementModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [dispatchKeyword, setDispachKeyword] = useState<IEmployeeRetirementModal>({
        retireEmployeeId: "",
        retireEmployeeNumber: "",
        retireEmployeeName: "",
        regDate: "",
    });
    return (
        <EmployeeRetirementModalContext.Provider
            value={{
                dispatchKeyword,
                setDispachKeyword,
            }}
        >
            {children}
        </EmployeeRetirementModalContext.Provider>
    );
};
