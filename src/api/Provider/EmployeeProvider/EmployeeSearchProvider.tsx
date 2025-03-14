import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface IEmployeeSearchKeywordContext {
    searchId: string;
    setSearchId: Dispatch<SetStateAction<string>>;
    searchName: string;
    setSearchName: Dispatch<SetStateAction<string>>;
    searchRegDateStart: string;
    setSearchRegDateStart: Dispatch<SetStateAction<string>>;
    searchRegDateEnd: string;
    setSearchRegDateEnd: Dispatch<SetStateAction<string>>;
    department: string;
    setDepartment: Dispatch<SetStateAction<string>>;
    jobGrade: string;
    setJobGrade: Dispatch<SetStateAction<string>>;
    emplStatus: string;
    setEmplStatus: Dispatch<SetStateAction<string>>;
}

const defaultValue: IEmployeeSearchKeywordContext = {
    searchId: "",
    setSearchId: () => {},
    searchName: "",
    setSearchName: () => {},
    searchRegDateStart: "",
    setSearchRegDateStart: () => {},
    searchRegDateEnd: "",
    setSearchRegDateEnd: () => {},
    department: "",
    setDepartment: () => {},
    jobGrade: "",
    setJobGrade: () => {},
    emplStatus: "",
    setEmplStatus: () => {},
};

export const EmployeeSearchContext = createContext<IEmployeeSearchKeywordContext>(defaultValue);

export const EmployeeSearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchId, setSearchId] = useState<string>("");
    const [searchName, setSearchName] = useState<string>("");
    const [searchRegDateStart, setSearchRegDateStart] = useState<string>("");
    const [searchRegDateEnd, setSearchRegDateEnd] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [jobGrade, setJobGrade] = useState<string>("");
    const [emplStatus, setEmplStatus] = useState<string>("");

    return (
        <EmployeeSearchContext.Provider
            value={{
                searchId,
                setSearchId,
                searchName,
                setSearchName,
                searchRegDateStart,
                setSearchRegDateStart,
                searchRegDateEnd,
                setSearchRegDateEnd,
                jobGrade,
                setJobGrade,
                department,
                setDepartment,
                emplStatus,
                setEmplStatus,
            }}
        >
            {children}
        </EmployeeSearchContext.Provider>
    );
};
