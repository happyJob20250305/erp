import { useContext, useEffect, useRef, useState } from "react";
import { EmployeeSearchStyled } from "./styled";
import { EmployeeSearchContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeSearchProvider";
import { postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import { SalaryOptionList } from "../../../../../api/api";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";
import { setSelectOption } from "../../../../../common/setSelectOption";

export const EmployeeSearch = () => {
    const { setSearchKeyword } = useContext(EmployeeSearchContext);
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [selectedEmplStatus, setSelectedEmplStatus] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);
    const departmentOptions = setSelectOption(
        DepartmentGroupItem,
        "departmentDetailName", // 라벨 (화면에 표시될 값)
        "departmentDetailName", // 값 (실제 선택될 값)
        { label: "전체", value: "" } // 기본 옵션
    );

    const jobGradeOptions = setSelectOption(JobGradeGroupItem, "jobGradeDetailName", "jobGradeDetailName", {
        label: "전체",
        value: "",
    });

    // 부서, 직급 옵션 데이터 조회
    useEffect(() => {
        getOptionList();
    }, []);

    useEffect(() => {
        if (selectedEmplStatus) {
            handleSearchSaveContext();
        }
    }, [selectedEmplStatus]);

    const getOptionList = async () => {
        const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);
        if (result) {
            setDepartmentGroupItem(result.DepartmentGroupList);
            setGradeGroupItem(result.JobGradeGroupList);
        }
    };

    const handleSearchSaveContext = () => {
        setSearchKeyword({
            searchId: employeeNumber,
            searchName: employeeNameInput,
            department: selectedDepartment,
            jobGrade: selectedJobGrade,
            searchRegDateStart: startDate,
            searchRegDateEnd: endDate,
            emplStatus: selectedEmplStatus,
        });
    };

    const resetSearch = () => {
        setSearchKeyword({}); // 검색 컨텍스트 초기화
        setEmployeeNameInput(""); // 이름 입력 필드 초기화
        setEmployeeNumber(""); // 사번 입력 필드 초기화
        setSelectedDepartment(""); // 부서 선택 초기화
        setSelectedJobGrade(""); // 직급 선택 초기화
        setSelectedEmplStatus(""); // 재직 상태 초기화
        setStartDate(""); // 입사일 시작일 초기화
        setEndDate(""); // 입사일 종료일 초기화
    };

    return (
        <EmployeeSearchStyled>
            <div className='searchBarBox'>
                <div className='searchBar'>
                    <span>부서</span>
                    <StyledSelectBox
                        options={departmentOptions}
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                    />
                    <span>직급</span>
                    <StyledSelectBox
                        options={jobGradeOptions}
                        value={selectedJobGrade}
                        onChange={setSelectedJobGrade}
                    />
                    <span>사번</span>
                    <StyledInput value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} />
                    <span>이름</span>
                    <StyledInput value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                </div>

                <div className='searchBar' style={{ border: "5px solid white" }}>
                    <StyledButton onClick={() => setSelectedEmplStatus("W")}>재직자</StyledButton>
                    <StyledButton onClick={() => setSelectedEmplStatus("F")}>퇴직자</StyledButton>
                    <div className='searchBar'>
                        <span>입사일 조회</span>
                        <StyledInput type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <StyledInput type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <StyledButton onClick={handleSearchSaveContext}>검색</StyledButton>
                        <img src='/refresh.png' onClick={resetSearch} style={{ width: "30px", height: "30px" }} />
                    </div>
                </div>
            </div>
        </EmployeeSearchStyled>
    );
};
