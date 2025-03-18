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
import { setSelectOption } from "../../../../../common/setSelectOption";

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
        setSearchEmployeeName(employeeNameInput);
        setSearchEmployeeNumber(employeeNumber);
        setSearchRegDateEnd(endDate);
        setSearchRegDateStart(startDate);
        setDepartment(selectedDepartment);
        setJobGrade(selectedJobGrade);
    };

    const resetSearch = () => {
        setSearchEmployeeName("");
        setSearchEmployeeNumber("");
        setSearchRegDateEnd("");
        setSearchRegDateStart("");
        setDepartment("");
        setJobGrade("");
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
    return (
        <>
            <PromotionSearchStyled>
                <div className='searchBarBox' style={{ border: "5px solid white" }}>
                    <div className='searchBar' style={{ border: "5px solid white" }}>
                        {/* 부서 : department */}
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
                        {/* 사원명 : searchEmployeeName */}
                        <span>사번</span>
                        <StyledInput value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} />
                        <span>이름</span>
                        <StyledInput value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                    </div>
                    <div className='searchBar'>
                        {/* 입사일 조회 */}
                        <span>기간별 조회 </span>
                        <StyledInput type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <StyledInput type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        {/* 검색  */}
                        <StyledButton onClick={handleSearchcSaveContext}>검색</StyledButton>
                        <img
                            src='/refresh.png'
                            onClick={resetSearch}
                            style={{ width: "30px", height: "30px", color: "white" }}
                        />
                    </div>
                </div>
            </PromotionSearchStyled>
        </>
    );
};
