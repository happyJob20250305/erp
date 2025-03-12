import { Form, FormLabel } from "react-bootstrap";
import { StyledInputStyled } from "../../../../common/StyledInput/styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { EmployeeRegisterModalStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { useContext, useState } from "react";
import { EmployeeDetailModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";

export const EmployeeRegisterModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [formData, setFormData] = useState({
        number: "",
        employeeName: "",
        registrationNumber: "",
        sex: "",
        birthday: "",
        finalEducation: "",
        email: "",
        hp: "",
        address: "",
        addressDetail: "",
        bank: "",
        bankAccount: "",
        departmentDetailName: "",
        jobGradeDetailName: "",
        regDate: "",
        resignationDate: "",
        workingYear: "",
        severancePay: "",
        departmentCode: "",
        emplStatus: "",
        jobGradeCode: "",
        salary: "",
    });

    if (!modal) return null; // 모달이 false면 렌더링하지 않음
    const closeModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <EmployeeRegisterModalStyled>
                <table className='container'>
                    <tbody>
                        <tr>
                            {/* 이미지 고정 영역 */}
                            {/* <td
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
                            </td> */}
                            <th>사번</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>이름</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>주민번호</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>성별</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>최종학력</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>연락처</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>상세주소</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>은행</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>계좌번호</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>부서</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>직급</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>입사일</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>퇴사일</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>근무연차</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>퇴직금</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>부서코드</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>재직 구분</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>직무</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                            <th>직급코드</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                        <tr>
                            <th>연봉</th>
                            <td colSpan={3}>
                                <StyledInput />
                            </td>
                        </tr>
                    </tbody>
                    <StyledButton onClick={closeModal}>등록</StyledButton>
                    <StyledButton onClick={closeModal}>취소</StyledButton>
                </table>
            </EmployeeRegisterModalStyled>
        </>
    );
};
