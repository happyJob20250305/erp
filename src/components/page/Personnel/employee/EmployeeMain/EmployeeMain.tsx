import { useContext, useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";

import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { Column } from "../../../../common/StyledTable/StyledTable";
import { EmployeeMainStyled } from "./styled";

import { IEmployee, IEmployeeResponse } from "../../../../../models/interface/personnel/employee/IEmployeeList";
import { Employee } from "../../../../../api/api";
import { modalState } from "../../../../../stores/modalState";

import { EmployeeRegisterModal } from "../EmployeeRegisterModal/EmployeeRegisterModal";
import { EmployeeDetailModal } from "../EmployeeDetailModal/EmployeeDetailModal";
import { EmployeeRetireModal } from "../EmployeeRetireModal/EmployeeRetireModal";

import { EmployeeDetailModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";
import { EmployeeSearchContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeSearchProvider";
import { EmployeeRetirementModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeRetirementModalProvider";
import { MKStyledTable } from "../../../../common/MkStyledTable/MKStyled";
import { searchApi } from "../../../../../api/SystemApi/searchApi";

export const EmployeeMain = () => {
    console.log("EmployeeMain 렌더링됨!");
    const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
    const [employeeCnt, setEmployeeCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(1);
    const [modalType, setModalType] = useState<string>("");
    const [modal, setModal] = useRecoilState(modalState);

    const { setEmployeeId, setJobGradeCode, setdepartmentCode } = useContext(EmployeeDetailModalContext);
    const { searchKeyword } = useContext(EmployeeSearchContext);
    const { setRetireEmployeeId, setRetireEmployeeNumber, setRetireEmployeeName, setRegDate } =
        useContext(EmployeeRetirementModalContext);

    console.log(searchKeyword);
    // 테이블 컬럼 정의
    const columns: Column<IEmployee>[] = [
        { key: "number", title: "사번" },
        { key: "employeeName", title: "사원명" },
        { key: "departmentCode", title: "부서코드" },
        { key: "departmentDetailName", title: "부서명" },
        { key: "jobGradeDetailName", title: "직급" },
        { key: "regDate", title: "입사일자" },
        { key: "actions2", title: "재직 상태" },
        { key: "resignationDate", title: "퇴직일자" },
        { key: "actions", title: "퇴직처리" },
    ];

    const statusMap: { [key: string]: string } = {
        W: "재직",
        F: "퇴직",
        O: "휴직",
    };

    const employeeBasicList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IEmployeeResponse>(Employee.employeeList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

        if (result) {
            setEmployeeList(result.employeeList);
            setEmployeeCnt(result.employeeCnt);
            setCPage(currentPage);
        }
    };

    // 호출
    useEffect(() => {
        employeeBasicList();
    }, [searchKeyword]);

    // 등록 후 새로고침
    const postSuccess = () => {
        setModal(false);
        employeeBasicList();
    };

    // 모달 오픈
    const handleModal = () => {
        setModal(true);
        setModalType("registerModal");
    };

    // 상세 모달
    const handleEmployeDetail = (employeeId: string, jobGradeCode: string, departmentCode: string) => {
        setEmployeeId(employeeId);
        setJobGradeCode(jobGradeCode);
        setdepartmentCode(departmentCode);
        setModalType("detailModal");
        setModal(true);
    };

    //  퇴직 모달
    const handleResign = (employeeId: string, employeeNumber: string, employeeName: string, regDate: string) => {
        if (window.confirm(`${employeeNumber}님을 퇴직 처리하시겠습니까?`)) {
            setRetireEmployeeId(employeeId);
            setRetireEmployeeNumber(employeeNumber);
            setRetireEmployeeName(employeeName);
            setRegDate(regDate);
            setModalType("retireModal");
            setModal(true);
        }
    };

    return (
        <>
            <EmployeeMainStyled>
                <div className='button-container'>
                    <StyledButton style={{ float: "right", marginBottom: "15px" }} onClick={handleModal}>
                        사원 등록
                    </StyledButton>
                </div>
                <div className='table-container'>
                    <MKStyledTable
                        columns={columns}
                        data={employeeList}
                        striped
                        // bordered
                        hoverable
                        fullWidth
                        onCellClick={(row) => handleEmployeDetail(row.employeeId, row.jobGradeCode, row.departmentCode)}
                        renderAction2={(row) => <span>{statusMap[row.emplStatus] || "알 수 없음"}</span>}
                        renderAction={(row) =>
                            row.emplStatus === "W" ? (
                                <StyledButton
                                    size='small'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleResign(row.employeeId, row.number, row.employeeName, row.regDate);
                                    }}
                                >
                                    퇴직처리
                                </StyledButton>
                            ) : (
                                <StyledButton size='small' disabled variant='secondary'>
                                    퇴직처리불가
                                </StyledButton>
                            )
                        }
                    />
                </div>
                {/*  페이지 네비 */}
                <PageNavigate
                    totalItemsCount={employeeCnt}
                    onChange={setCPage}
                    activePage={cPage}
                    itemsCountPerPage={5}
                />
            </EmployeeMainStyled>
            {/*  모달들 */}
            {modalType === "registerModal" && modal && (
                <Portal>
                    <EmployeeRegisterModal postSuccess={postSuccess} />
                </Portal>
            )}
            {modalType === "detailModal" && modal && (
                <Portal>
                    <EmployeeDetailModal />
                </Portal>
            )}
            {modalType === "retireModal" && modal && (
                <Portal>
                    <EmployeeRetireModal postSuccess={postSuccess} />
                </Portal>
            )}
        </>
    );
};
