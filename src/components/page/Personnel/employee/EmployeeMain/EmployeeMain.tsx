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
                                <StyledTd>{employee.employeeId}</StyledTd>
                                <StyledTd>{employee.employeeName}</StyledTd>
                                <StyledTd>{employee.departmentCode}</StyledTd>
                                <StyledTd>{employee.departmentDetailName}</StyledTd>
                                <StyledTd>{employee.jobGradeDetailName}</StyledTd>
                                <StyledTd>{employee.regDate}</StyledTd>
                                <StyledTd>{employee.emplStatus}</StyledTd>
                                <StyledTd>{employee.resignationDate}</StyledTd>
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
        </>
    );
};
