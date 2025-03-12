import { useEffect, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";

import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";
import { postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import { SalaryOptionList } from "../../../../../api/api";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { EmployeeSearchStyled } from "./styled";

export const EmployeeSearch = () => {
    //start date
    const [startDate, setStartDate] = useState<string>("");
    //end date
    const [endDate, setEndDate] = useState<string>("");

    //DepartmentGroupItem
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);

    //JobGradeGroupItem
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);

    // 컴포넌트 마운트 시점에 옵션 목록 조회
    useEffect(() => {
        getOptionList();
    }, []);

    const getOptionList = async () => {
        const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);

        if (result) {
            setDepartmentGroupItem(result.DepartmentGroupList);
            setGradeGroupItem(result.JobGradeGroupList);
            console.log(result);
        }
    };

    // 2) SelectBox에서 사용할 옵션 배열 생성
    //    (label, value) 형태를 StyledSelectBox에 맞춰 변환
    const departmentOptions = DepartmentGroupItem.map((item) => ({
        label: item.departmentDetailName,
        value: item.departmentDetailName,
    }));

    const jobGradeOptions = JobGradeGroupItem.map((item) => ({
        label: item.jobGradeDetailName,
        value: item.jobGradeDetailName,
    }));

    // Input 관리 (ref 대신 state 추천)
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    // 셀렉트 박스 선택 값 (별도 상태로 관리)
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");

    return (
        <>
            <EmployeeSearchStyled>
                {/* 부서 : department */}
                <div style={{ marginLeft: "20px" }}>
                    부서
                    <StyledSelectBox
                        options={departmentOptions}
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                    />
                    {/* 직급 : jobGrade */}
                    직급
                    <StyledSelectBox
                        options={jobGradeOptions}
                        value={selectedJobGrade}
                        onChange={setSelectedJobGrade}
                    />
                    {/* 사원명 : searchEmployeeName */}
                    사번
                    <StyledInput value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                    이름
                    <StyledInput value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                </div>
                <StyledButton>재직자</StyledButton>
                <StyledButton>퇴직자</StyledButton>
                {/* 입사일 조회 */}
                입사일 조회
                {/* 급여 계산  */}
                <StyledInput type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <StyledInput type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <StyledButton>검색</StyledButton>
                {/* 지급 여부 : searchPamentStatus */}
                {/* 검색  */}
                {/* <StyledButton onClick={handleSearch}>검색</StyledButton> */}
                {/* 일괄 지급 */}
            </EmployeeSearchStyled>
        </>
    );
};
