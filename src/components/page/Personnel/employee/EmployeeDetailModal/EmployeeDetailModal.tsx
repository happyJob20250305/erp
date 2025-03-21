import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { modalState } from "../../../../../stores/modalState";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { EmployeeDetailModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";
import { Employee } from "../../../../../api/api";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import {
    IEmployeeDetailResponse,
    IJobRole,
    IJobRoleResponse,
    ISalaryClass,
} from "../../../../../models/interface/personnel/employee/IEmployeeDetailModal";
import { EmployeeModalStyled } from "./styled";
import { ButtonArea, ModalStyledTable } from "../../../Account/VoucherList/VoucherListModal/styled";
import { SelectBox } from "../../../../common/StyledSelectBox/styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { IDepartmentGroupItem, IJobGradeGroupItem } from "../../../../../models/interface/personnel/salary/IOptionList";
import { bankOptions, educationOptions, statusOptions } from "../../../../../common/employeeModalOptions";
import DaumPostcode from "react-daum-postcode"; // 추가
import { DaumAddressModal } from "../../../../../common/DaumAddressModal";
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
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [jobRoleGroupList, setRoleGroupList] = useState<IJobRole[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { setEmployeeDetailModalKeyword } = useContext(EmployeeDetailModalContext);
    const departmentOptions = setSelectOption(DepartmentGroupItem, "departmentDetailName", "departmentDetailName");
    const jobGradeOptions = setSelectOption(JobGradeGroupItem, "jobGradeDetailName", "jobGradeDetailName");
    const jobRoleGroupOptions = setSelectOption(jobRoleGroupList, "jobRoleDetailName", "jobRoleDetailName", {
        label: "전체",
        value: "",
    });

    useEffect(() => {
        getJobDetailCode(selectedDepartment);
    }, [selectedDepartment]);

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

        if (result && result.detail) {
            setResponse(result);
            setSalaryClassList(result.salaryClassList);
            setDepartmentGroupItem(result.departmentGroupList);
            setGradeGroupItem(result.jobGradeGroupList);

            if (result.detail.jobGradeDetailName) {
                getJobDetailCode(result.detail.jobGradeDetailName);
            }
        } else {
            console.warn("사원 상세 정보가 존재하지 않음");
        }
    };

    const handleComplete = (data: any) => {
        setIsOpen(false);
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") extraAddress += data.bname;
            if (data.buildingName !== "")
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            if (extraAddress !== "") fullAddress += ` (${extraAddress})`;
        }

        setZipCode(data.zonecode);
        setAddress(fullAddress);
    };

    // jobGradeDetailName;
    const getJobDetailCode = async (jobGradeDetailName) => {
        const params = new URLSearchParams();
        params.append("departmentDetailName", jobGradeDetailName);
        // params.append("zipCode", zipCode);
        const jobDetailCode = await postApi<IJobRoleResponse>(Employee.getJobRolesByDepartment, params);
        setRoleGroupList(jobDetailCode.jobRoleGroupList);
    };

    //사원 수정
    const updateEmployee = async () => {
        const formData = new FormData(formRef.current!);

        try {
            const retuls = await postApi<IEmployeeDetailResponse>(Employee.employeeUpdate, formData);
            alert("수정되었습니다.");
        } catch {
            alert("수정 실패");
        }
    };

    const closeModal = () => {
        setModal(false);
        if (employeeDetailModalKeyword) {
            setEmployeeDetailModalKeyword({});
        }
    };

    //  파일 업로드 핸들링
    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImageUrl(previewUrl); // 미리보기용 이미지 주소 세팅
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
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt='미리보기'
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    ) : response?.detail?.profileLogicalPath ? (
                                        <img
                                            src={response.detail.profileLogicalPath}
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

                                    <input type='file' name='file' onChange={handlerFile} />
                                </td>

                                <th>사번</th>
                                <td>
                                    <StyledInput
                                        name='employeeId'
                                        value={response?.detail?.employeeId || ""}
                                        type='hidden'
                                        readOnly
                                        variant='disable'
                                    />
                                    <StyledInput name='number' value={response?.detail?.number || ""} readOnly />
                                </td>
                                <th>이름</th>
                                <td>
                                    <StyledInput
                                        name='employeeName'
                                        value={response?.detail?.employeeName || ""}
                                        readOnly
                                        variant='disable'
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
                                        variant='disable'
                                    />
                                </td>
                                <th>성별</th>
                                <td>
                                    <StyledInput
                                        name='sex'
                                        variant='disable'
                                        value={response?.detail?.sex || ""}
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>생년월일</th>
                                <td>
                                    <StyledInput
                                        name='birthday'
                                        variant='disable'
                                        value={response?.detail?.birthday || ""}
                                        readOnly
                                    />
                                </td>
                                <th>최종학력*</th>
                                <td>
                                    <StyledSelectBox
                                        options={educationOptions}
                                        name='finalEducation'
                                        defaultValue={response?.detail?.finalEducation || ""}
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
                                <th>연봉*</th>
                                <td>
                                    <StyledInput
                                        name='workingYear'
                                        variant='disable'
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
                                    ></StyledInput>
                                </td>
                                <th>우편번호*</th>
                                <td>
                                    <StyledInput
                                        name='zipCode'
                                        defaultValue={response?.detail?.zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                    <StyledButton
                                        type='button'
                                        onClick={() => setIsOpen(true)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        주소 검색<span style={{ color: "red" }}>*</span>
                                    </StyledButton>
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
                            {/* 주소 검색 모달 (조건부 렌더링) */}
                            {isOpen && (
                                <DaumAddressModal onComplete={handleComplete} onClose={() => setIsOpen(false)} />
                            )}
                            <tr>
                                <th>은행*</th>
                                <td>
                                    <StyledSelectBox
                                        options={bankOptions}
                                        name='bank'
                                        defaultValue={response?.detail?.bank || ""}
                                    />
                                </td>
                                <th>계좌번호*</th>
                                <td>
                                    <StyledInput name='bankAccount' value={response?.detail?.bankAccount || ""} />
                                </td>
                            </tr>
                            <tr>
                                <th>부서*</th>
                                <td>
                                    <StyledSelectBox
                                        options={departmentOptions}
                                        name='departmentDetailName'
                                        defaultValue={response?.detail?.departmentDetailName || ""}
                                        onChange={setSelectedDepartment}
                                    />
                                </td>
                                <th>직급*</th>
                                <td>
                                    <StyledSelectBox
                                        options={jobGradeOptions}
                                        defaultValue={response?.detail?.jobGradeDetailName || ""}
                                        name='jobGradeDetailName'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>입사일</th>
                                <td>
                                    <StyledInput
                                        name='regDate'
                                        variant='disable'
                                        value={response?.detail?.regDate || ""}
                                        readOnly
                                    />
                                </td>
                                <th>퇴사일</th>
                                <td>
                                    <StyledInput
                                        name='resignationDate'
                                        variant='disable'
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
                                        variant='disable'
                                        value={`${response?.detail?.workingYear ?? 0}년`}
                                        readOnly
                                    />
                                </td>
                                <th>퇴직금</th>
                                <td>
                                    <StyledInput
                                        name='severancePay'
                                        variant='disable'
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
                                        variant='disable'
                                        value={response?.detail?.departmentCode || ""}
                                        readOnly
                                    />
                                </td>
                                <th>재직 구분</th>
                                <td>
                                    <StyledSelectBox
                                        options={statusOptions}
                                        defaultValue={emplStatus}
                                        name='emplStatus'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>직무</th>
                                <td>
                                    <StyledSelectBox
                                        options={jobRoleGroupOptions}
                                        defaultValue={response?.detail?.jobRoleDetailName || ""}
                                        name='jobRoleDetailName'
                                    />
                                </td>
                                <th>직급코드</th>
                                <td>
                                    <StyledInput
                                        name='jobGradeCode'
                                        variant='disable'
                                        value={response?.detail?.jobGradeCode || ""}
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
