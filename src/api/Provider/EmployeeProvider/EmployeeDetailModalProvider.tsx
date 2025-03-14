import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface IEmployeeDetailModalKeywordContext {
    employeeId: string;
    setEmployeeId: Dispatch<SetStateAction<string>>;
    jobGradeCode: string;
    setJobGradeCode: Dispatch<SetStateAction<string>>;
    departmentCode: string;
    setdepartmentCode: Dispatch<SetStateAction<string>>;
}

const defaultValue: IEmployeeDetailModalKeywordContext = {
    employeeId: "",
    setEmployeeId: () => {},
    jobGradeCode: "",
    setJobGradeCode: () => {},
    departmentCode: "",
    setdepartmentCode: () => {},
};
export const EmployeeDetailModalContext = createContext<IEmployeeDetailModalKeywordContext>(defaultValue);

// Provider 컴포넌트
export const EmployeeDetailProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [employeeId, setEmployeeId] = useState<string>("");
    const [jobGradeCode, setJobGradeCode] = useState<string>("");
    const [departmentCode, setdepartmentCode] = useState<string>("");

    return (
        <EmployeeDetailModalContext.Provider
            value={{ employeeId, setEmployeeId, jobGradeCode, setJobGradeCode, departmentCode, setdepartmentCode }}
        >
            {children}
        </EmployeeDetailModalContext.Provider>
    );
};
