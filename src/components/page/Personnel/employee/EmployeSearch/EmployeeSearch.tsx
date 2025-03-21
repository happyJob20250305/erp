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
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { EmployeeRegisterModal } from "../EmployeeRegisterModal/EmployeeRegisterModal";
import { Portal } from "../../../../common/potal/Portal";

export const EmployeeSearch = () => {
    const { setSearchKeyword } = useContext(EmployeeSearchContext);
    const [modal, setModal] = useRecoilState(modalState);
    const [modalType, setModalType] = useState<string>("");
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [selectedEmplStatus, setSelectedEmplStatus] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);
    const departmentOptions = setSelectOption(DepartmentGroupItem, "departmentDetailName", "departmentDetailName", {
        label: "전체",
        value: "",
    });

    const jobGradeOptions = setSelectOption(JobGradeGroupItem, "jobGradeDetailName", "jobGradeDetailName", {
        label: "전체",
        value: "",
    });

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
    const handleModal = () => {
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
                        <StyledButton onClick={handleModal}>사원 등록</StyledButton>
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
