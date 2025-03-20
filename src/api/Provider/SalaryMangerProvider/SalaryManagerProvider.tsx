import React, { createContext, useState, FC, ReactNode, Dispatch, SetStateAction } from "react"; // ✅ vm 아님!

// interface ISearchKeywordContext {
//     searchEmployeeName: string;
//     setSearchEmployeeName: Dispatch<SetStateAction<string>>;
//     department: string;
//     setDepartment: Dispatch<React.SetStateAction<string>>;
//     jobGrade: string;
//     setJobGrade: Dispatch<React.SetStateAction<string>>;
//     searchPaymentStatus: number | null;
//     setSearchPaymentStatus: Dispatch<React.SetStateAction<number | null>>;
//     searchPaymentMonth: string;
//     setSearchPaymentMonth: Dispatch<React.SetStateAction<string>>;
//     paymentData: string;
//     setPaymentData: Dispatch<React.SetStateAction<string>>;
//     paymentStatus: string;
//     setPaymentStatus: Dispatch<React.SetStateAction<string>>;
// }

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const SalaryManagerContext = createContext<ISearchKeyword>({});

// Provider 컴포넌트
export const SalarySearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});

    return (
        <SalaryManagerContext.Provider
            value={{
                searchKeyword,
                setSearchKeyword,
            }}
        >
            {children}
        </SalaryManagerContext.Provider>
    );
};
