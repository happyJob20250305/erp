import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { modalState } from "../../../../../stores/modalState";
import { useContext, useEffect, useState } from "react";
import { EmployeeDetailModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";
import { Employee } from "../../../../../api/api";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { IEmployeeDetailResponse } from "../../../../../models/interface/personnel/employee/IEmployeeDetailModal";
import { EmployeeModalStyled } from "./styled";

export const EmployeeDetailModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [response, setResponse] = useState<IEmployeeDetailResponse>();
    const { employeeId, jobGradeCode, departmentCode } = useContext(EmployeeDetailModalContext);

    const closeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        // if (employeeId && jobGradeCode && departmentCode) {
        // 값이 모두 존재할 때만 호출
        employeeDetailList();
        // }
    }, [employeeId, jobGradeCode, departmentCode]);
    const employeeDetailList = async () => {
        const searchParam = new URLSearchParams();
        searchParam.append("employeeId", employeeId);
        searchParam.append("jobGradeCode", jobGradeCode);
        searchParam.append("departmentCode", departmentCode);

        try {
            const result = await postApi<IEmployeeDetailResponse>(Employee.employeeDetail, searchParam);
            if (result) {
                setResponse(result);

                console.log(result.detail.employeeId);
            }
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    return (
        <EmployeeModalStyled>
            <table className='container'>
                <tbody>
                    <tr>
                        {/* 이미지 고정 영역 */}
                        <td
                            rowSpan={14} // 전체 row 수만큼 설정
                            style={{ width: "180px", textAlign: "center", verticalAlign: "middle" }}
                        >
                            {response?.detail?.profileLogicalPath ? (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <img
                                        src={response?.detail?.profileLogicalPath}
                                        alt='프로필'
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "150px",
                                    }}
                                >
                                    이미지 없음
                                </div>
                            )}
                        </td>
                        <th>사번</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.number || ""} readOnly />
                        </td>
                        <th>이름</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.employeeName || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>주민번호</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.registrationNumber || ""} readOnly />
                        </td>
                        <th>성별</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.sex || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.birthday || ""} readOnly />
                        </td>
                        <th>최종학력</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.finalEducation || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.email || ""} readOnly />
                        </td>
                        <th>연락처</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.hp || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.address || ""} readOnly />
                        </td>
                        <th>상세주소</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.addressDetail || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>은행</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.bank || ""} readOnly />
                        </td>
                        <th>계좌번호</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.bankAccount || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>부서</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.departmentDetailName || ""} readOnly />
                        </td>
                        <th>직급</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.jobGradeDetailName || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>입사일</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.regDate || ""} readOnly />
                        </td>
                        <th>퇴사일</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.resignationDate || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>근무연차</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.workingYear || ""} readOnly />
                        </td>
                        <th>퇴직금</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.severancePay || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>부서코드</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.departmentCode || ""} readOnly />
                        </td>
                        <th>재직 구분</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.emplStatus || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>직무</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.departmentDetailName || ""} readOnly />
                        </td>
                        <th>직급코드</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.jobGradeCode || ""} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <th>연봉</th>
                        <td colSpan={3}>
                            <StyledInput value={response?.detail?.address || ""} readOnly />
                        </td>
                    </tr>
                </tbody>
                <StyledButton onClick={closeModal}>취소</StyledButton>
            </table>
        </EmployeeModalStyled>
    );
};
