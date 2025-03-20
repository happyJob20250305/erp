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
import { SalaryManager, SalaryOptionList } from "../../../../../api/api";
import { SalaryManagerContext } from "../../../../../api/Provider/SalaryMangerProvider/SalaryManagerProvider";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { postApi } from "../../../../../api/SystemApi/postApi";

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

    // (추가) 지급여부 SelectBox용 옵션 예시
    const paymentStatusOptions = [
        { label: "전체", value: "" },
        { label: "지급완료", value: "1" },
        { label: "미지급", value: "0" },
    ];

    // context 상태 및 업데이트 함수 가져오기
    const { setSearchKeyword } = useContext(SalaryManagerContext);
    // 검색 클릭 시 context에 저장

    const handleSearch = () => {
        setSearchKeyword({
            searchEmployeeName: employeeNameInput,
            department: selectedDepartment,
            jobGrade: selectedJobGrade,
            searchPaymentStatus: selectedPaymentStatus,
            searchPaymentMonth: selectedMonth,
        });
    };

    const resetSearch = () => {
        setSearchKeyword({}); // 검색 컨텍스트 초기화
        setEmployeeNameInput(""); // 사원명 초기화
        setSelectedDepartment(""); // 부서 초기화
        setSelectedJobGrade(""); // 직급 초기화
        setSelectedPaymentStatus(null); // 지급 여부 초기화
        setSelectedMonth(""); // 급여년월 초기화
        setSelectedPaymentDate(""); // 급여 계산 월 초기화
    };

    // //급여 계산
    // const salarySave = (selectedPaymentDate: string) => {
    //     setSearchKeyword({ paymentData: selectedPaymentDate });
    // };

    const salarySave = async (selectedPaymentDate: string) => {
        if (!selectedPaymentDate) {
            alert("급여 계산할 월을 선택해주세요.");
            return;
        }

        try {
            const searchParam = new URLSearchParams();
            searchParam.append("paymentDate", selectedPaymentDate);

            await postApi<string>(SalaryManager.salarySave, searchParam);

            alert("급여가 생성되었습니다.");

            // ✅ 급여 생성 후 해당 월의 급여만 검색하도록 설정
            setSearchKeyword({
                searchPaymentMonth: selectedPaymentDate, // 선택한 월로 검색 필터 설정
            });
        } catch (error) {
            console.error("급여 생성 오류:", error);
            alert("급여 생성 중 오류가 발생했습니다.");
        }
    };

    // 지급되고 나서 리스트 초기화 되어야 함
    const allPaymentStatusUpdate = async () => {
        const searchParam = new URLSearchParams();
        searchParam.append("paymentStatus", "1");

        const result = await postApi<string>(SalaryManager.allPaymentStatusUpdate, searchParam);
        alert("전부 지급 처리 되었습니다.");
        setSearchKeyword({
            searchPaymentStatus: selectedPaymentStatus,
        });
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
