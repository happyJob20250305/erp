import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { PromotionSearchStyled } from "./styled";
import { postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import { SalaryOptionList } from "../../../../../api/api";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";
import { PromotionSearchContext } from "../../../../../api/Provider/PromitionProvider/PromotionSearhProvider";
import context from "react-bootstrap/esm/AccordionContext";

export const PromotionSearch = () => {
    // context 상태 및 업데이트 함수 가져오기
    const {
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
    } = useContext(PromotionSearchContext);

    // Input 관리 (ref 대신 state 추천)
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    // 셀렉트 박스 선택 값 (별도 상태로 관리)
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
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

    const handleSearchcSaveContext = () => {
        console.log("검색 버튼 클릭");
        setSearchEmployeeName(employeeNameInput);
        setSearchEmployeeNumber(employeeNumber);
        setSearchRegDateEnd(endDate);
        setSearchRegDateStart(startDate);
        setDepartment(selectedDepartment);
        setJobGrade(selectedJobGrade);
        console.log("컨테스트에 저장");
        console.log(employeeNameInput);
        console.log(employeeNumber);
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

    return (
        <>
            <PromotionSearchStyled>
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
                    <StyledInput value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} />
                    이름
                    <StyledInput value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                </div>
                {/* 입사일 조회 */}
                기간별 조회
                {/* 급여 계산  */}
                <StyledInput type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <StyledInput type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                {/* 검색  */}
                <StyledButton onClick={handleSearchcSaveContext}>검색</StyledButton>
            </PromotionSearchStyled>
        </>
    );
};
