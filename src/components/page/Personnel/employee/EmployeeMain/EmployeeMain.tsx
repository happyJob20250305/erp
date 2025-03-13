import { useContext, useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { IEmployee, IEmployeeResponse } from "../../../../../models/interface/personnel/employee/IEmployeeList";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { Employee } from "../../../../../api/api";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { EmployeeRegisterModal } from "../EmployeeRegisterModal/EmployeeRegisterModal";
import { EmployeeDetailModal } from "../EmployeeDetailModal/EmployeeDetailModal";
import {
    EmployeeDetailModalContext,
    EmployeeDetailProvider,
} from "../../../../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";
import { EmployeeSearchContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeSearchProvider";
import { EmployeeRetirementModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeRetirementModalProvider";
import { EmployeeRetireModal } from "../EmployeeRetireModal/EmployeeRetireModal";

export const EmplyoeeMain = () => {
    const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
    const [employeeCnt, setEmployeeCnt] = useState<IEmployeeResponse["employeeCnt"]>(0);
    const [cPage, setCPage] = useState<number>(1);
    const [modalType, setModalType] = useState<string>("");
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const { employeeId, setEmployeeId, jobGradeCode, setJobGradeCode, departmentCode, setdepartmentCode } =
        useContext(EmployeeDetailModalContext);
    //context 상태 및 업데이트 함수 가져오기
    const {
        searchId,
        setSearchId,
        searchName,
        setSearchName,
        searchRegDateStart,
        setSearchRegDateStart,
        searchRegDateEnd,
        setSearchRegDateEnd,
        jobGrade,
        setJobGrade,
        department,
        setDepartment,
        emplStatus,
        setEmplStatus,
    } = useContext(EmployeeSearchContext);

    const {
        retireEmployeeId,
        setRetireEmployeeId,
        retireEmployeeNumber,
        setRetireEmployeeNumber,
        retireEmployeeName,
        setRetireEmployeeName,
        regDate,
        setRegDate,
    } = useContext(EmployeeRetirementModalContext);

    useEffect(() => {
        employeeBasicList(cPage);
    }, [cPage, searchId, searchName, searchRegDateEnd, searchRegDateStart, jobGrade, department, emplStatus]);

    useEffect(() => {});

    //리스트 출력
    const employeeBasicList = async (currentPage: number) => {
        const searchParam = new URLSearchParams();
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");
        if (searchId) searchParam.append("searchId", searchId);
        if (searchName) searchParam.append("searchName", searchName);
        if (searchRegDateStart) searchParam.append("searchRegDateStart", searchRegDateStart);
        if (searchRegDateEnd) searchParam.append("searchRegDateEnd", searchRegDateEnd);
        if (jobGrade) searchParam.append("jobGrade", jobGrade);
        if (department) searchParam.append("department", department);
        if (emplStatus) searchParam.append("emplStatus", emplStatus);

        const result = await postApi<IEmployeeResponse>(Employee.employeeList, searchParam);
        if (result) {
            setEmployeeList(result.employeeList);
            setEmployeeCnt(result.employeeCnt);
        }
    };

    //등록 모달
    const handleModal = () => {
        setModal(!modal);
        setModalType("registerModal");
    };

    const handleEmployeDetail = (employeeId, jobGradeCode, departmentCode) => {
        console.log("클릭한 사원 정보: ", { employeeId, jobGradeCode, departmentCode }); // ✅ 찍어보기

        setEmployeeId(employeeId);
        setJobGradeCode(jobGradeCode);
        setdepartmentCode(departmentCode);

        setModalType("detailModal");
        setModal(!modal);
    };

    const handleResign = (employeeId, employeeNumber, employeeName, regDate) => {
        const confirmResign = window.confirm(`${employeeNumber}님을 퇴직 처리하시겠습니까?`);
        if (!confirmResign) return; // 아니오 클릭 시 아무 일 없음

        // 예 클릭 시 퇴직 모달 열기
        setRetireEmployeeId(employeeId);
        setRetireEmployeeNumber(employeeNumber);
        setRetireEmployeeName(employeeName);
        setRegDate(regDate);

        setModalType("retireModal");
        setModal(true); // ✅ 무조건 열기 (토글 금지)
    };

    // const closeModal = () => {
    //     setModal(!modal);
    //     setModalType("");
    //     setEmployeeId(null);
    // };

    return (
        <>
            <StyledButton onClick={handleModal}>사원 등록</StyledButton>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>사번</StyledTh>
                        <StyledTh>사원명</StyledTh>
                        <StyledTh>부서코드</StyledTh>
                        <StyledTh>부서명</StyledTh>
                        <StyledTh>직급</StyledTh>
                        <StyledTh>입사일자</StyledTh>
                        <StyledTh>휴직</StyledTh>
                        <StyledTh>퇴직일자</StyledTh>
                        <StyledTh>퇴직처리</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {employeeList.length ? (
                        employeeList.map((employee) => (
                            <tr
                                key={employee.employeeId}
                                onClick={() =>
                                    handleEmployeDetail(
                                        employee.employeeId,
                                        employee.jobGradeCode,
                                        employee.departmentCode
                                    )
                                }
                            >
                                <StyledTd>{employee.number}</StyledTd>
                                <StyledTd>{employee.employeeName}</StyledTd>
                                <StyledTd>{employee.departmentCode}</StyledTd>
                                <StyledTd>{employee.departmentDetailName}</StyledTd>
                                <StyledTd>{employee.jobGradeDetailName}</StyledTd>
                                <StyledTd>{employee.regDate}</StyledTd>
                                <StyledTd>{employee.emplStatus}</StyledTd>
                                <StyledTd>{employee.resignationDate}</StyledTd>
                                <StyledTd>
                                    {employee.emplStatus === "W" ? (
                                        <StyledButton
                                            onClick={(e) => {
                                                e.stopPropagation(); // ✅ tr 클릭 방지
                                                handleResign(
                                                    employee.employeeId,
                                                    employee.number,
                                                    employee.employeeName,
                                                    employee.regDate
                                                );
                                            }}
                                        >
                                            퇴직처리
                                        </StyledButton>
                                    ) : (
                                        <StyledButton disabled>퇴직불가</StyledButton>
                                    )}
                                </StyledTd>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <StyledTd colSpan={8}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>

            <PageNavigate totalItemsCount={employeeCnt} onChange={setCPage} activePage={cPage} itemsCountPerPage={5} />

            {modalType === "registerModal" && modal && (
                <Portal>
                    <EmployeeRegisterModal />
                </Portal>
            )}
            {modalType === "detailModal" && modal && (
                <Portal>
                    <EmployeeDetailModal />
                </Portal>
            )}
            {modalType === "retireModal" && modal && (
                <Portal>
                    <EmployeeRetireModal />
                </Portal>
            )}
        </>
    );
};
