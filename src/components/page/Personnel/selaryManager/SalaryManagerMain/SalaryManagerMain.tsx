import { useContext, useEffect, useState } from "react";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useLocation } from "react-router-dom";
import { ISalaryListDetail } from "../../../../../models/interface/personnel/salary/IsalaryMain";
import { ISalaryListDetailResponse } from "../../../../../models/interface/personnel/salary/ISalaryManager";
import { searchApi } from "../../../../../api/PersonnelApi/searchApi";
import { SalaryManager } from "../../../../../api/api";
import { SalaryManagerContext } from "../../../../../api/Provider/SalaryMangerProvider/SalaryManagerProvider";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";

interface SalaryManagerDetailProps {
    Pdata: (data: number) => void;
}
export const SalaryManagerMain = ({ Pdata }: SalaryManagerDetailProps) => {
    const { search } = useLocation();

    const [salaryList, setSalaryList] = useState<ISalaryListDetail[]>([]);
    const [salaryCnt, setSalaryCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(1);

    const { searchKeyword } = useContext(SalaryManagerContext);

    // 테이블 컬럼 정의
    const columns: Column<ISalaryListDetail>[] = [
        { key: "employeeName", title: "사원명" },
        { key: "jobGradeDetailName", title: "직급" },
        { key: "departmentDetailName", title: "부서명" },
        { key: "employeeNumber", title: "사번" },
        { key: "salary", title: "연봉" },
        { key: "baseSalary", title: "기본급" },
        { key: "nationalPension", title: "국민연금" },
        { key: "healthInsurance", title: "건강보험료" },
        { key: "industrialAccident", title: "산재보험" },
        { key: "employmentInsurance", title: "고용보험" },
        { key: "additionalAmount", title: "비고금액" },
        { key: "actions", title: "지급" },
    ];

    // useEffect(() => {
    //     salarySave(searchKeyword.paymentDate);
    // }, [Pdata]);

    // useEffect(() => {
    //     if (paymentStatus) allPaymentStatus(paymentStatus);
    // }, [paymentStatus]);

    useEffect(() => {
        loadSalaryList();
    }, [cPage, searchKeyword]);

    const loadSalaryList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<ISalaryListDetailResponse>(SalaryManager.salaryList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

        if (result) {
            setSalaryList(result.salaryList);
            setSalaryCnt(result.salaryCnt);
        }
    };

    const salarySave = async (paymentData: string) => {
        const searchParam = new URLSearchParams(search);
        searchParam.append("paymentDate", paymentData);

        const result = await postApi<string>(SalaryManager.salarySave, searchParam);
        alert("급여가 생성되었습니다.");
    };

    const allPaymentStatus = async (paymentStatus: string) => {
        const searchParam = new URLSearchParams(search);
        searchParam.append("paymentStatus", paymentStatus);

        const result = await postApi<string>(SalaryManager.allPaymentStatusUpdate, searchParam);
        alert("전부 지급 처리 되었습니다.");
    };

    const handlePayment = async (salaryId: number, baseSalary: number) => {
        if (window.confirm("지급하시겠습니까?")) {
            try {
                const searchParam = new URLSearchParams(search);
                searchParam.append("salaryId", salaryId.toString());
                searchParam.append("baseSalary", baseSalary.toString());

                await postApi<string>(SalaryManager.paymentStatusUpdate, searchParam);
                alert("지급완료 되었습니다.");
                loadSalaryList();
            } catch (error) {
                alert("지급 처리 중 오류가 발생했습니다.");
            }
        } else {
            alert("지급이 취소되었습니다.");
        }
    };

    const handlerSearch = (employeeNumber: number) => {
        Pdata(employeeNumber);
    };

    return (
        <>
            <div>총 개수 : {salaryCnt}</div>

            <div className='table-container'>
                <StyledTable
                    columns={columns}
                    data={salaryList}
                    striped
                    hoverable
                    fullWidth
                    onCellClick={(row) => handlerSearch(row.employeeNumber)}
                    renderAction={(row) =>
                        row.paymentStatus === 0 ? (
                            <StyledButton
                                size='small'
                                onClick={(e) => {
                                    handlePayment(row.salaryId, row.baseSalary);
                                }}
                            >
                                지급하기
                            </StyledButton>
                        ) : (
                            <StyledButton size='small' disabled variant='secondary'>
                                지급 완료
                            </StyledButton>
                        )
                    }
                />
            </div>

            <PageNavigate totalItemsCount={salaryCnt} onChange={setCPage} activePage={cPage} itemsCountPerPage={5} />
        </>
    );
};
