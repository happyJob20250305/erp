import { useContext, useEffect, useRef, useState } from "react";
import { EmployeeSearchStyled } from "./styled";
import { EmployeeSearchContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeSearchProvider";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../../../../stores/modalState";
import { EmployeeRegisterModal } from "../EmployeeRegisterModal/EmployeeRegisterModal";
import { Portal } from "../../../../common/potal/Portal";
import { fetchDepartmentOptions, fetchJobGradeOptions } from "../../../../../common/employeeModalOptions";

export const EmployeeSearch = () => {
    const { setSearchKeyword } = useContext(EmployeeSearchContext);
    const [modal, setModal] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [selectedEmplStatus, setSelectedEmplStatus] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [jobGradeOptions, setJobGradeOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const dep = await fetchDepartmentOptions();
            const grade = await fetchJobGradeOptions();
            setDepartmentOptions(dep);
            setJobGradeOptions(grade);
        })();
    }, []);

    useEffect(() => {
        if (selectedEmplStatus) {
            handleSearchSaveContext();
        }
    }, [selectedEmplStatus]);

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
        setSearchKeyword({});
        setEmployeeNameInput("");
        setEmployeeNumber("");
        setSelectedDepartment("");
        setSelectedJobGrade("");
        setSelectedEmplStatus("");
        setStartDate("");
        setEndDate("");
    };

    //등록 모달
    const handleRegisterModal = () => {
        setModal(true);
        setModalType("registerModal");
    };

    const postSuccess = () => {
        setModal(false);
    };

    return (
        <EmployeeSearchStyled>
            <div className='search-group'>
                <div className='search-bar'>
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

                <div className='search-bar'>
                    <StyledButton onClick={() => setSelectedEmplStatus("W")}>재직자</StyledButton>
                    <StyledButton onClick={() => setSelectedEmplStatus("F")}>퇴직자</StyledButton>
                    <span>입사일 조회</span>
                    <StyledInput
                        type='date'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        onKeyDown={(e) => e.preventDefault()}
                        max={endDate}
                    />
                    <StyledInput
                        type='date'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        onKeyDown={(e) => e.preventDefault()}
                        min={startDate}
                    />
                    <div className='button-container'>
                        <StyledButton onClick={handleSearchSaveContext}>검색</StyledButton>
                        <StyledButton onClick={handleRegisterModal}>사원 등록</StyledButton>
                        <img src='/refresh.png' onClick={resetSearch} style={{ width: "25px", height: "25px" }} />
                    </div>
                </div>
            </div>

            {modalType === "registerModal" && modal && (
                <Portal>
                    <EmployeeRegisterModal postSuccess={postSuccess} />
                </Portal>
            )}
        </EmployeeSearchStyled>
    );
};
