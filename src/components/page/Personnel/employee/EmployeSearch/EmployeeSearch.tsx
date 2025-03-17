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

    // SelectBox 옵션 변환
    const departmentOptions = [
        { label: "전체", value: "" }, // 가장 첫 번째 항목으로 추가
        ...DepartmentGroupItem.map((item) => ({
            label: item.departmentDetailName,
            value: item.departmentDetailName,
        })),
    ];

    const jobGradeOptions = [
        { label: "전체", value: "" }, // 가장 첫 번째 항목으로 추가
        ...JobGradeGroupItem.map((item) => ({
            label: item.jobGradeDetailName,
            value: item.jobGradeDetailName,
        })),
    ];

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

                    {/* 재직 상태 */}
                    <span>재직 상태</span>
                    <StyledSelectBox
                        options={emplStatusOptions}
                        value={selectedEmplStatus}
                        onChange={(val) => setSelectedEmplStatus(val as string)}
                    />
                    {/* 입사일 조회 */}
                    <span>입사일 조회</span>
                    <StyledInput type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <StyledInput type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className='searchBar' style={{ border: "5px solid white" }}>
                    <span>사번</span>
                    <StyledInput value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} />
                    <span>이름</span>
                    <StyledInput value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                    {/* 검색 버튼 */}
                    <div className='button-container'>
                        <StyledButton onClick={handleSearchSaveContext}>검색</StyledButton>
                    </div>
                </div>
            </div>
        </EmployeeSearchStyled>
    );
};
