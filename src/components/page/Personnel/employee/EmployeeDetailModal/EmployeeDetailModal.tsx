import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { modalState } from "../../../../../stores/modalState";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { EmployeeDetailModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";
import { Employee, SalaryOptionList } from "../../../../../api/api";
import { postApi, postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import {
    IEmployeeDetailResponse,
    ISalaryClass,
} from "../../../../../models/interface/personnel/employee/IEmployeeDetailModal";
import { EmployeeModalStyled } from "./styled";
import { ButtonArea, ModalStyledTable } from "../../../Account/VoucherList/VoucherListModal/styled";
import { SelectBox } from "../../../../common/StyledSelectBox/styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { setSelectOption } from "../../../../../common/setSelectOption";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";

export const EmployeeDetailModal = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [response, setResponse] = useState<IEmployeeDetailResponse>();
    const [salaryClassList, setSalaryClassList] = useState<ISalaryClass>();
    const { employeeDetailModalKeyword } = useContext(EmployeeDetailModalContext);
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [isOpen, setIsOpen] = useState(false); // 모달 오픈 상태
    const [email, setEmail] = useState("");
    const [hp, setHp] = useState("");
    const [finalEducation, setFinalEducation] = useState("");
    const [emplStatus, setEmplStatus] = useState<string | undefined>(undefined); // 초기값을 undefined로 설정
    const [department, setDepartment] = useState<string | undefined>(undefined);
    const [jobGrade, setJobGrade] = useState<string | undefined>(undefined);
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);

    const departmentOptions = setSelectOption(DepartmentGroupItem, "departmentDetailName", "departmentDetailName");

    const jobGradeOptions = setSelectOption(JobGradeGroupItem, "jobGradeDetailName", "jobGradeDetailName");
    const statusOptions = [
        { value: "W", label: "재직" },
        { value: "O", label: "휴직" },
        { value: "F", label: "퇴직" },
    ];

    useEffect(() => {
        getOptionList();
    }, []);

    const getOptionList = async () => {
        const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);
        if (result) {
            setDepartmentGroupItem(result.DepartmentGroupList);
            setGradeGroupItem(result.JobGradeGroupList);
        }
    };

    const handleStatusChange = (selectedValue: string) => {
        setEmplStatus(selectedValue);
    };
    const handleDepartmentChange = (selectedValue: string) => {
        console.log("부서 변경됨:", selectedValue); // ✅ 값 변경 확인
        setDepartment(selectedValue);
    };

    const handleJobGrateChange = (selectedValue: string) => {
        setJobGrade(selectedValue);
    };

    useEffect(() => {
        if (response?.detail?.emplStatus) {
            setEmplStatus(response.detail.emplStatus);
        }
    }, [response]); // response가 변경될 때 emplStatus 업데이트

    useEffect(() => {
        employeeDetail();
    }, [employeeDetailModalKeyword]);

    useEffect(() => {
        if (response?.detail) {
            setEmail(response.detail.email || "");
            setHp(response.detail.hp || "");
            setFinalEducation(response.detail.finalEducation || "");
            setAddress(response.detail.address || "");
            setAddressDetail(response.detail.addressDetail || "");
        }
    }, [response]);

    const employeeDetail = async () => {
        const result = await postApi<IEmployeeDetailResponse>(Employee.employeeDetail, {
            ...employeeDetailModalKeyword,
        });
        if (result) {
            setResponse(result);
            setSalaryClassList(result.salaryClassList);
        }
    };

    const updateEmployee = async () => {
        const formData = new FormData(formRef.current!);
        formData.append("emplStatus", emplStatus);
        formData.append("department", department);
        try {
            const retuls = await postApi<IEmployeeDetailResponse>(Employee.employeeUpdate, formData);
            alert("수정되었습니다.");
        } catch {
            alert("수정 실패");
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    return (
        <EmployeeModalStyled>
            <div className='container'>
                <h2>사원 상세</h2>
                <form ref={formRef}>
                    <ModalStyledTable>
                        <tbody>
                            <tr>
                                {/* 이미지 고정 영역 */}
                                <td
                                    rowSpan={12}
                                    style={{ width: "180px", textAlign: "center", verticalAlign: "middle" }}
                                >
                                    {response?.detail?.profileLogicalPath ? (
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
                                <td>
                                    <StyledInput
                                        name='employeeId'
                                        value={response?.detail?.employeeId || ""}
                                        type='hidden'
                                        readOnly
                                    />
                                    <StyledInput name='number' value={response?.detail?.number || ""} readOnly />
                                </td>
                                <th>이름</th>
                                <td>
                                    <StyledInput
                                        name='employeeName'
                                        value={response?.detail?.employeeName || ""}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>주민번호</th>
                                <td>
                                    <StyledInput
                                        name='registrationNumber'
                                        value={response?.detail?.registrationNumber || ""}
                                        readOnly
                                    />
                                </td>
                                <th>성별</th>
                                <td>
                                    <StyledInput name='sex' value={response?.detail?.sex || ""} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <th>생년월일</th>
                                <td>
                                    <StyledInput name='birthday' value={response?.detail?.birthday || ""} readOnly />
                                </td>
                                <th>최종학력*</th>
                                <td>
                                    <StyledInput
                                        name='finalEducation'
                                        value={finalEducation}
                                        onChange={(e) => setFinalEducation(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>이메일*</th>
                                <td>
                                    <StyledInput
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                                <th>연락처*</th>
                                <td>
                                    <StyledInput name='hp' value={hp} onChange={(e) => setHp(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <th>주소*</th>
                                <td>
                                    <StyledInput
                                        name='address'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </td>
                                <th>상세주소*</th>
                                <td>
                                    <StyledInput
                                        name='addressDetail'
                                        value={addressDetail}
                                        onChange={(e) => setAddressDetail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>은행*</th>
                                <td>
                                    <StyledInput name='bank' value={response?.detail?.bank || ""} />
                                </td>
                                <th>계좌번호*</th>
                                <td>
                                    <StyledInput name='bankAccount' value={response?.detail?.bankAccount || ""} />
                                </td>
                            </tr>
                            <tr>
                                <th>부서*</th>
                                <td>
                                    {/* <StyledSelectBox
                                        options={statusOptions}
                                        value={emplStatus}
                                        onChange={handleStatusChange}
                                    /> */}
                                    {/* <StyledSelectBox
                                        options={departmentOptions}
                                        value={department || ""}
                                        onChange={handleDepartmentChange}
                                    /> */}
                                    <StyledInput
                                        name='departmentDetailName'
                                        value={response?.detail?.departmentDetailName || ""}
                                    />
                                </td>
                                <th>직급*</th>
                                <td>
                                    {/* <StyledSelectBox
                                        options={jobGradeOptions}
                                        value={response?.detail?.jobGradeDetailName|| ""}
                                        onChange={handleDepartmentChange}
                                    /> */}
                                    <StyledInput
                                        name='jobGradeDetailName'
                                        value={response?.detail?.jobGradeDetailName || ""}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>입사일</th>
                                <td>
                                    <StyledInput name='regDate' value={response?.detail?.regDate || ""} readOnly />
                                </td>
                                <th>퇴사일</th>
                                <td>
                                    <StyledInput
                                        name='resignationDate'
                                        value={response?.detail?.resignationDate || ""}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>근무연차</th>
                                <td>
                                    <StyledInput
                                        name='workingYear'
                                        value={`${response?.detail?.workingYear ?? 0}년`}
                                        readOnly
                                    />
                                </td>
                                <th>퇴직금</th>
                                <td>
                                    <StyledInput
                                        name='severancePay'
                                        value={response?.detail?.severancePay || "미정"}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>부서코드</th>
                                <td>
                                    <StyledInput
                                        name='departmentCode '
                                        value={response?.detail?.departmentCode || ""}
                                        readOnly
                                    />
                                </td>
                                <th>재직 구분</th>
                                <td>
                                    <StyledSelectBox
                                        options={statusOptions}
                                        value={emplStatus}
                                        onChange={handleStatusChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>직무</th>
                                <td>
                                    <StyledInput
                                        name='departmentDetailName'
                                        value={response?.detail?.departmentDetailName || ""}
                                    />
                                </td>
                                <th>직급코드</th>
                                <td>
                                    <StyledInput
                                        name='jobGradeCode'
                                        value={response?.detail?.jobGradeCode || ""}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>연봉</th>
                                <td colSpan={3}>
                                    <StyledInput
                                        name='workingYear'
                                        value={
                                            response?.salaryClassList?.[`year${response?.detail?.workingYear}`]
                                                ? new Intl.NumberFormat("ko-KR", {
                                                      style: "currency",
                                                      currency: "KRW",
                                                  }).format(
                                                      response.salaryClassList[`year${response.detail.workingYear}`]
                                                  )
                                                : ""
                                        }
                                        readOnly
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </ModalStyledTable>
                </form>
                {/* 버튼 영역 */}
                <ButtonArea>
                    <StyledButton variant='secondary' type='button' onClick={updateEmployee}>
                        수정
                    </StyledButton>
                    <StyledButton variant='secondary' type='button' onClick={closeModal}>
                        닫기
                    </StyledButton>
                </ButtonArea>
            </div>
        </EmployeeModalStyled>
    );
};
