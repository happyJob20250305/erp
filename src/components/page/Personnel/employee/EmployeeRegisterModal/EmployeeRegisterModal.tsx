import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { EmployeeRegisterModalStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { FC, useEffect, useRef, useState } from "react";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { Employee } from "../../../../../api/api";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { IEmployeeRegisterResponse } from "../../../../../models/interface/personnel/employee/IEmployeeRegisterResponse";
import { ButtonArea, ModalStyledTable } from "../../../Account/VoucherList/VoucherListModal/styled";
import { setSelectOption } from "../../../../../common/setSelectOption";
import {
    formatPhoneNumber,
    formatRegistrationNumber,
    generateBirthdayFromRegNumber,
    validateAge,
    validateBankAccount,
    validateEmail,
    validateRequiredFields,
} from "../../../../../common/registerCheck";
import { IJobRole, IJobRoleResponse } from "../../../../../models/interface/personnel/employee/IEmployeeDetailModal";
import {
    bankOptions,
    educationOptions,
    fetchDepartmentOptions,
    fetchJobGradeOptions,
    sexOptionse,
} from "../../../../../common/employeeModalOptions";
import { DaumAddressModal } from "../../../../../common/DaumAddressModal";

interface IEmployeeRegisterModalProps {
    postSuccess: () => void;
}

export const EmployeeRegisterModal: FC<IEmployeeRegisterModalProps> = ({ postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [selectedEducation, setSelectedEducation] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [birthday, setBirthday] = useState("");
    const [jobRoleGroupList, setRoleGroupList] = useState<IJobRole[]>([]);
    const [selectedJobGRoleDetailName, setSelectedJobRoleDetailName] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false); // 모달 오픈 상태
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [jobGradeOptions, setJobGradeOptions] = useState([]);

    const jobRoleGroupOptions = setSelectOption(jobRoleGroupList, "jobRoleDetailName", "jobRoleDetailName", {
        label: "전체",
        value: "",
    });

    useEffect(() => {
        (async () => {
            const dep = await fetchDepartmentOptions();
            const grade = await fetchJobGradeOptions();
            setDepartmentOptions(dep);
            setJobGradeOptions(grade);
        })();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            getJobDetailCode(selectedDepartment);
        }
    }, [selectedDepartment]);

    useEffect(() => {
        if (registrationNumber.length === 14) {
            const generatedBirthday = generateBirthdayFromRegNumber(registrationNumber);
            setBirthday(generatedBirthday);
        } else {
            setBirthday("");
        }
    }, [registrationNumber]);

    // jobGradeDetailName;

    const getJobDetailCode = async (jobGradeDetailName) => {
        const params = new URLSearchParams();
        params.append("departmentDetailName", jobGradeDetailName);
        const jobDetailCode = await postApi<IJobRoleResponse>(Employee.getJobRolesByDepartment, params);
        setRoleGroupList(jobDetailCode.jobRoleGroupList);
    };

    //핸드폰 번호 입력 핸들러
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(formatPhoneNumber(e.target.value));
    };

    //주민번호 입력 핸들러
    const handleRegistrationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedRegNum = formatRegistrationNumber(e.target.value);
        setRegistrationNumber(formattedRegNum);

        // 주민번호 앞자리로 생년월일 자동 입력
        if (formattedRegNum.length === 14) {
            // 주민번호가 완전하게 입력된 경우
            const generatedBirthday = generateBirthdayFromRegNumber(formattedRegNum);
            if (generatedBirthday) {
                setBirthday(generatedBirthday); // 생년월일 상태 업데이트
            }
        }
    };

    //  파일 업로드 핸들링
    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && ["jpg", "gif", "png"].includes(file.name.split(".").pop()?.toLowerCase()!)) {
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const saveEmployee = async () => {
        const formData = new FormData(formRef.current!);

        // 필수 입력 항목 리스트
        const requiredFields = [
            "employeeName",
            "registrationNumber",
            "email",
            "hp",
            "bankAccount",
            "regDate",
            "sex",
            "finalEducation",
            "zipCode",
            "bank",
            "bankAccount",
            "regDate",
            "departmentDetailName",
            "jobGradeDetailName",
            "jobRoleDetailName",
            "paymentDate",
        ];

        // 1. 필수 입력값 검사
        if (!validateRequiredFields(formData, requiredFields)) return;

        const email = formData.get("email")?.toString().trim();
        const hp = formData.get("hp")?.toString().trim();
        const bankAccount = formData.get("bankAccount")?.toString().trim();
        const birthday = formData.get("birthday")?.toString().trim();
        const registrationNumber = formData.get("registrationNumber")?.toString().trim();

        // 2. 주민번호와 생년월일 자동 생성
        if (registrationNumber) {
            const generatedBirthday = generateBirthdayFromRegNumber(registrationNumber);
            if (generatedBirthday !== birthday) {
                alert("주민번호와 생년월일이 일치하지 않습니다.");
                return;
            }
        }

        // 3. 이메일 형식 검사
        if (!validateEmail(email!)) return;

        // 4. 계좌번호 검사
        if (!validateBankAccount(bankAccount!)) return;

        // 5. 생년월일 만 20세 이상 확인
        if (!validateAge(birthday!)) return;

        try {
            const result = await postApi<IEmployeeRegisterResponse>(Employee.employeeSave, formData);
            alert("저장되었습니다.");
            postSuccess();
        } catch {
            alert("저장 실패");
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

    //  모달 닫기
    const closeModal = () => setModal(false);

    //  모달 열려있을 때만 렌더링
    if (!modal) return null;

    return (
        <EmployeeRegisterModalStyled>
            <div className='container'>
                <h2>사원 등록</h2>
                <form ref={formRef}>
                    <ModalStyledTable>
                        <tbody>
                            {/* 1 */}
                            <tr>
                                <th>
                                    이름<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='text' name='employeeName' />
                                </td>
                                <th>
                                    주민번호<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='registrationNumber'
                                        value={registrationNumber}
                                        onChange={handleRegistrationNumberChange}
                                    />
                                </td>
                            </tr>
                            {/* 2 */}
                            <tr>
                                <th>
                                    생년월일<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='date' name='birthday' value={birthday} readOnly />
                                </td>
                                <th>
                                    성별<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledSelectBox
                                        options={sexOptionse}
                                        value={selectedSex}
                                        onChange={setSelectedSex}
                                    />
                                    <StyledInput type='hidden' name='sex' value={selectedSex} />
                                </td>
                            </tr>
                            {/* 3 */}
                            <tr>
                                <th>
                                    최종학력<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledSelectBox
                                        options={educationOptions}
                                        value={selectedEducation}
                                        onChange={setSelectedEducation}
                                    />
                                    <StyledInput type='hidden' name='finalEducation' value={selectedEducation} />
                                </td>
                                <th>
                                    이메일<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='email' name='email' />
                                </td>
                            </tr>
                            {/* 4 */}
                            <tr>
                                <th>
                                    연락처<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput
                                        type='tel'
                                        name='hp'
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                    />
                                </td>
                                <th>
                                    우편번호<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='text' name='zipCode' value={zipCode} readOnly />
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
                                <th>
                                    주소<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='text' name='address' value={address} readOnly />
                                </td>
                                <th>
                                    상세주소<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput
                                        type='text'
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

                            {/* 6 */}
                            <tr>
                                <th>
                                    은행<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledSelectBox
                                        options={bankOptions}
                                        value={selectedBank}
                                        onChange={setSelectedBank}
                                    />
                                    <StyledInput type='hidden' name='bank' value={selectedBank} />
                                </td>

                                <th>
                                    계좌번호<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='text' name='bankAccount' />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    입사일자<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='date' name='regDate' />
                                </td>
                                <th>
                                    부서<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledSelectBox
                                        name='departmentDetailName'
                                        options={departmentOptions}
                                        value={selectedDepartment}
                                        onChange={setSelectedDepartment}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    직급<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledSelectBox
                                        name='jobGradeDetailName'
                                        options={jobGradeOptions}
                                        value={selectedJobGrade}
                                        onChange={setSelectedJobGrade}
                                    />
                                </td>
                                <th>
                                    직무
                                    <span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledSelectBox
                                        options={jobRoleGroupOptions}
                                        value={selectedJobGRoleDetailName}
                                        onChange={setSelectedJobRoleDetailName}
                                    />
                                    <StyledInput
                                        type='hidden'
                                        name='jobRoleDetailName'
                                        value={selectedJobGRoleDetailName}
                                    />
                                </td>
                            </tr>
                            {/* 10 */}
                            <tr>
                                <th>
                                    지급일자<span style={{ color: "red" }}>*</span>
                                </th>
                                <td>
                                    <StyledInput type='date' name='paymentDate' />
                                </td>
                                <th>기타</th>
                                <td>
                                    <StyledInput type='text' name='empMemo' />
                                </td>
                            </tr>
                            {/* 사진 */}
                            <tr>
                                <th>
                                    사진<span style={{ color: "red" }}>*</span>
                                </th>
                                <td colSpan={3}>
                                    <input type='file' name='file' onChange={handlerFile} />
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt='미리보기'
                                            style={{ marginTop: "10px", width: "100px" }}
                                        />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </ModalStyledTable>

                    <input type='hidden' name='emplStatus' value='W' />

                    {/* 버튼 */}
                    <ButtonArea>
                        <StyledButton type='button' onClick={saveEmployee}>
                            등록
                        </StyledButton>
                        <StyledButton variant='secondary' type='button' onClick={closeModal}>
                            취소
                        </StyledButton>
                    </ButtonArea>
                </form>
            </div>
        </EmployeeRegisterModalStyled>
    );
};
