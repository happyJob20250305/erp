import React, { createContext, useState, FC, ReactNode, Dispatch, SetStateAction } from "react"; // ✅ vm 아님!

interface ISearchKeywordContext {
    searchEmployeeName: string;
    setSearchEmployeeName: Dispatch<SetStateAction<string>>;
    department: string;
    setDepartment: Dispatch<React.SetStateAction<string>>;
    jobGrade: string;
    setJobGrade: Dispatch<React.SetStateAction<string>>;
    searchPaymentStatus: number | null;
    setSearchPaymentStatus: Dispatch<React.SetStateAction<number | null>>;
    searchPaymentMonth: string;
    setSearchPaymentMonth: Dispatch<React.SetStateAction<string>>;
    paymentData: string;
    setPaymentData: Dispatch<React.SetStateAction<string>>;
    paymentStatus: string;
    setPaymentStatus: Dispatch<React.SetStateAction<string>>;
}

const defaultValue: ISearchKeywordContext = {
    searchEmployeeName: "",
    setSearchEmployeeName: () => {},
    department: "",
    setDepartment: () => {},
    jobGrade: "",
    setJobGrade: () => {},
    searchPaymentStatus: null,
    setSearchPaymentStatus: () => {},
    searchPaymentMonth: "",
    setSearchPaymentMonth: () => {},
    paymentData: "",
    setPaymentData: () => {},
    paymentStatus: "",
    setPaymentStatus: () => {},
};

export const SalaryManagerContext = createContext<ISearchKeywordContext>(defaultValue);

// Provider 컴포넌트
export const SalarySearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchEmployeeName, setSearchEmployeeName] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [jobGrade, setJobGrade] = useState<string>("");
    const [searchPaymentStatus, setSearchPaymentStatus] = useState<number | null>(null);
    const [searchPaymentMonth, setSearchPaymentMonth] = useState<string>("");
    const [paymentData, setPaymentData] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");

    return (
        <SalaryManagerContext.Provider
            value={{
                searchEmployeeName,
                setSearchEmployeeName,
                department,
                setDepartment,
                jobGrade,
                setJobGrade,
                searchPaymentStatus,
                setSearchPaymentStatus,
                searchPaymentMonth,
                setSearchPaymentMonth,
                paymentData,
                setPaymentData,
                paymentStatus,
                setPaymentStatus,
            }}
        >
            {children}
        </SalaryManagerContext.Provider>
    );
};
