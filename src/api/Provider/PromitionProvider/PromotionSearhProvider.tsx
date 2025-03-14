import React, { createContext, useState, FC, ReactNode, Dispatch, SetStateAction } from "react"; // ✅ vm 아님!

interface IPromotionSearchContext {
    searchEmployeeNumber: string;
    setSearchEmployeeNumber: Dispatch<SetStateAction<string>>;
    searchEmployeeName: string;
    setSearchEmployeeName: Dispatch<SetStateAction<string>>;
    department: string;
    setDepartment: Dispatch<React.SetStateAction<string>>;
    jobGrade: string;
    setJobGrade: Dispatch<React.SetStateAction<string>>;
    searchRegDateStart: string;
    setSearchRegDateStart: Dispatch<React.SetStateAction<string>>;
    searchRegDateEnd: string;
    setSearchRegDateEnd: Dispatch<React.SetStateAction<string>>;
}

const defaultValue: IPromotionSearchContext = {
    searchEmployeeNumber: "",
    setSearchEmployeeNumber: () => {},
    searchEmployeeName: "",
    setSearchEmployeeName: () => {},
    department: "",
    setDepartment: () => {},
    jobGrade: "",
    setJobGrade: () => {},
    searchRegDateStart: "",
    setSearchRegDateStart: () => {},
    searchRegDateEnd: "",
    setSearchRegDateEnd: () => {},
};

export const PromotionSearchContext = createContext<IPromotionSearchContext>(defaultValue);

// Provider 컴포넌트
export const PromotionSearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchEmployeeNumber, setSearchEmployeeNumber] = useState<string>("");
    const [searchEmployeeName, setSearchEmployeeName] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [jobGrade, setJobGrade] = useState<string>("");
    const [searchRegDateStart, setSearchRegDateStart] = useState<string>("");
    const [searchRegDateEnd, setSearchRegDateEnd] = useState<string>("");

    return (
        <PromotionSearchContext.Provider
            value={{
                searchEmployeeNumber,
                setSearchEmployeeNumber,
                searchEmployeeName,
                setSearchEmployeeName,
                department,
                setDepartment,
                jobGrade,
                setJobGrade,
                searchRegDateStart,
                setSearchRegDateStart,
                searchRegDateEnd,
                setSearchRegDateEnd,
            }}
        >
            {children}
        </PromotionSearchContext.Provider>
    );
};
