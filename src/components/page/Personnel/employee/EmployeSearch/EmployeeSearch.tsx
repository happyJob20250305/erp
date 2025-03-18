import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
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
    // Context 상태
    const {
        setSearchId,
        setSearchName,
        setSearchRegDateStart,
        setSearchRegDateEnd,
        setJobGrade,
        setDepartment,
        setEmplStatus,
    } = useContext(EmployeeSearchContext);

    // Input, SelectBox 상태
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [selectedEmplStatus, setSelectedEmplStatus] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    // 옵션 데이터 상태
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);

    const emplStatusOptions = [
        { label: "전체", value: "" },
        { label: "재직자", value: "W" },
        { label: "퇴직자", value: "F" },
    ];

    // 부서, 직급 옵션 데이터 조회
    useEffect(() => {
        const getOptionList = async () => {
            const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);
            if (result) {
                setDepartmentGroupItem(result.DepartmentGroupList);
                setGradeGroupItem(result.JobGradeGroupList);
                console.log(result);
            }
        };
        getOptionList();
    }, []);

    // context에 검색 조건 저장
    const handleSearchSaveContext = () => {
        setSearchId(employeeNumber);
        setSearchName(employeeNameInput);
        setDepartment(selectedDepartment);
        setJobGrade(selectedJobGrade);
        setSearchRegDateStart(startDate);
        setSearchRegDateEnd(endDate);
        setEmplStatus(selectedEmplStatus);
    };

    const resetSearch = () => {
        setSearchId("");
        setSearchName("");
        setDepartment("");
        setJobGrade("");
        setSearchRegDateStart("");
        setSearchRegDateEnd("");
        setEmplStatus("");
    };

    // SelectBox 옵션 변환
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

    // 렌더링
    return (
        <EmployeeSearchStyled>
            <div className='searchBarBox' style={{ border: "5px solid white" }}>
                <div className='searchBar' style={{ border: "5px solid white" }}>
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

                    {/* 재직 상태 */}
                    {/* <span>재직 상태</span>
                    <StyledSelectBox
                        options={emplStatusOptions}
                        value={selectedEmplStatus}
                        onChange={(val) => setSelectedEmplStatus(val as string)}
                    /> */}
                    {/* 입사일 조회 */}
                    {/* <span>입사일 조회</span>
                    <StyledInput type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <StyledInput type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} /> */}
                </div>
                {/* <div className='searchBar' style={{ border: "5px solid white" }}>
                    <span>입사일 조회</span>
                    <StyledInput type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <StyledInput type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <StyledButton onClick={handleSearchSaveContext}>검색</StyledButton>
                    <img src='/refresh.png' onClick={resetSearch} style={{ width: "30px", height: "30px" }} />
                </div> */}

                <div className='searchBar' style={{ border: "5px solid white" }}>
                    <StyledButton onClick={() => setEmplStatus("W")}>재직자</StyledButton>
                    <StyledButton onClick={() => setEmplStatus("F")}>퇴직자</StyledButton>

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
