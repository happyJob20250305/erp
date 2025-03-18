import { useContext, useEffect, useRef, useState } from "react";
import { SalalyListSearchStyled } from "../../salaryList/SalaryListSearch/styled";

import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

import { SalalyManagerSearchStyled } from "./styled";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";
import { postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import { SalaryOptionList } from "../../../../../api/api";
import { SalaryManagerContext } from "../../../../../api/Provider/SalaryMangerProvider/SalaryManagerProvider";

export const SalaryManagerSearch = () => {
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

    // (추가) 지급여부 SelectBox용 옵션 예시
    const paymentStatusOptions = [
        { label: "전체", value: "" },
        { label: "지급완료", value: "1" },
        { label: "미지급", value: "0" },
    ];

    // context 상태 및 업데이트 함수 가져오기
    const {
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
    } = useContext(SalaryManagerContext);
    // 검색 클릭 시 context에 저장

    const handleSearch = () => {
        setSearchEmployeeName(employeeNameInput);
        setDepartment(selectedDepartment);
        setJobGrade(selectedJobGrade);
        setSearchPaymentStatus(selectedPaymentStatus);
        setSearchPaymentMonth(selectedMonth);
    };

    const resetSearch = () => {
        setSearchEmployeeName("");
        setDepartment("");
        setJobGrade("");
        setSearchPaymentStatus(null);
        setSearchPaymentMonth("");
    };

    //급여 계산
    const salarySave = (selectedPaymentDate: string) => {
        setPaymentData(selectedPaymentDate);
        console.log(selectedPaymentDate);
    };

    //일괄 지급
    const allPaymentStatusUpdate = () => {
        setPaymentStatus("1");
    };

    // Input 관리 (ref 대신 state 추천)
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    // 셀렉트 박스 선택 값 (별도 상태로 관리)
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState("");

    //급여 계산
    const [selectedPaymentDate, setSelectedPaymentDate] = useState("");

    return (
        <SalalyManagerSearchStyled>
            <div className='searchBarBox' style={{ border: "5px solid white" }}>
                <div className='searchBar' style={{ border: "5px solid white" }}>
                    {/* 급여 계산  */}
                    <span>급여 계산</span>
                    <StyledInput
                        type='month'
                        value={selectedPaymentDate}
                        onChange={(e) => setSelectedPaymentDate(e.target.value)}
                    />
                    <StyledButton onClick={() => salarySave(selectedPaymentDate)}>급여 생성</StyledButton>
                    {/* 일괄 지급 */}
                    <StyledButton onClick={allPaymentStatusUpdate}>일괄 지급</StyledButton>
                </div>
                <div className='searchBar' style={{ border: "5px solid white" }}>
                    {/* 직급 : jobGrade */}
                    <span>직급</span>
                    <StyledSelectBox
                        options={jobGradeOptions}
                        value={selectedJobGrade}
                        onChange={setSelectedJobGrade}
                    />
                    {/* 부서 : department */}
                    <span>부서</span>
                    <StyledSelectBox
                        options={departmentOptions}
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                    />
                    {/* 사원명 : searchEmployeeName */}
                    <span>사원명</span>
                    <StyledInput value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                </div>

                <div className='searchBar' style={{ border: "5px solid white" }}>
                    {/* 급여년월 searchPaymentMonth */}
                    <span>급여년월</span>
                    <StyledInput
                        type='month'
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />

                    {/* 지급 여부 : searchPamentStatus */}
                    <span>지급 여부 </span>
                    <StyledSelectBox
                        options={paymentStatusOptions}
                        value={selectedPaymentStatus?.toString()}
                        onChange={(val) => setSelectedPaymentStatus(val ? Number(val) : null)}
                    />
                    {/* 검색  */}
                    <StyledButton onClick={handleSearch}>검색</StyledButton>

                    <img
                        src='/refresh.png'
                        onClick={resetSearch}
                        style={{ width: "30px", height: "30px", color: "white" }}
                    />
                </div>
            </div>
        </SalalyManagerSearchStyled>
    );
};
