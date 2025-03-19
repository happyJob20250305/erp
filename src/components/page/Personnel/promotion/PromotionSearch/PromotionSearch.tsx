import { useContext, useEffect, useRef, useState } from "react";
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
import { setSelectOption } from "../../../../../common/setSelectOption";

export const PromotionSearch = () => {
    const { setSearchKeyword } = useContext(PromotionSearchContext);

    const employeeName = useRef<HTMLInputElement>();
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);

    useEffect(() => {
        getOptionList();
    }, []);

    const handlerSearch = () => {
        setSearchKeyword({
            searchName: employeeNameInput,
            searchId: employeeNumber,
            department: selectedDepartment,
            jobGrade: selectedJobGrade,
            searchRegDateStart: startDate,
            searchRegDateEnd: endDate,
        });
    };

    const getOptionList = async () => {
        const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);

        if (result) {
            setDepartmentGroupItem(result.DepartmentGroupList);
            setGradeGroupItem(result.JobGradeGroupList);
            console.log(result);
        }
    };

    const resetSearch = () => {
        setSearchKeyword({}); // 검색 컨텍스트 초기화
        setEmployeeNameInput(""); // 이름 초기화
        setEmployeeNumber(""); // 사번 초기화
        setSelectedDepartment(""); // 부서 선택 초기화
        setSelectedJobGrade(""); // 직급 선택 초기화
        setStartDate(""); // 날짜 초기화
        setEndDate(""); // 날짜 초기화
    };

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
                <div className='searchBarBox'>
                    <div className='searchBar'>
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
                        <StyledButton onClick={handlerSearch}>검색</StyledButton>
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
