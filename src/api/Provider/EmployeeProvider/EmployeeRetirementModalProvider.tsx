import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface IEmployeeRetirementModalContext {
    // employeeId, employeeName, resignationDate
    retireEmployeeId: string;
    setRetireEmployeeId: Dispatch<SetStateAction<string>>;
    retireEmployeeNumber: string;
    setRetireEmployeeNumber: Dispatch<SetStateAction<string>>;
    retireEmployeeName: string;
    setRetireEmployeeName: Dispatch<SetStateAction<string>>;
    regDate: string;
    setRegDate: Dispatch<SetStateAction<string>>;
}

const defaultValue: IEmployeeRetirementModalContext = {
    retireEmployeeId: "",
    setRetireEmployeeId: () => {},
    retireEmployeeNumber: "",
    setRetireEmployeeNumber: () => {},
    retireEmployeeName: "",
    setRetireEmployeeName: () => {},
    regDate: "",
    setRegDate: () => {},
};

export const EmployeeRetirementModalContext = createContext<IEmployeeRetirementModalContext>(defaultValue);

// Provider 컴포넌트
export const EmployeeRetirementModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [retireEmployeeId, setRetireEmployeeId] = useState<string>("");
    const [retireEmployeeNumber, setRetireEmployeeNumber] = useState<string>("");
    const [retireEmployeeName, setRetireEmployeeName] = useState<string>("");
    const [regDate, setRegDate] = useState<string>("");

    return (
        <EmployeeRetirementModalContext.Provider
            value={{
                retireEmployeeId,
                setRetireEmployeeId,
                retireEmployeeNumber,
                setRetireEmployeeNumber,
                retireEmployeeName,
                setRetireEmployeeName,
                regDate,
                setRegDate,
            }}
        >
            {children}
        </EmployeeRetirementModalContext.Provider>
    );
};
