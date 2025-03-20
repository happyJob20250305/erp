import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { EmployeeRegisterModalStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { FC, useEffect, useRef, useState } from "react";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";
import { postApi, postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import { Employee, SalaryOptionList } from "../../../../../api/api";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { IEmployeeRegisterResponse } from "../../../../../models/interface/personnel/employee/IEmployeeRegisterResponse";
import { ButtonArea, ModalStyledTable } from "../../../Account/VoucherList/VoucherListModal/styled";
import DaumPostcode from "react-daum-postcode"; // 추가
import { setSelectOption } from "../../../../../common/setSelectOption";
import { validateEmployeeForm } from "../../../../../common/registerCheck";

interface IEmployeeRegisterModalProps {
    postSuccess: () => void;
}

export const EmployeeRegisterModal: FC<IEmployeeRegisterModalProps> = ({ postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const formRef = useRef<HTMLFormElement>(null);
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [selectedEducation, setSelectedEducation] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [isOpen, setIsOpen] = useState(false); // 모달 오픈 상태
    const departmentOptions = setSelectOption(
        DepartmentGroupItem,
        "departmentDetailName", // 라벨 (화면에 표시될 값)
        "departmentDetailName", // 값 (실제 선택될 값)
        { label: "전체", value: "" } // 기본 옵션
    );

    const educationOptions = [
        { label: "선택", value: "" },
        { label: "고등학교 졸업", value: "고등학교 졸업" },
        { label: "전문대학 졸업", value: "전문대학 졸업" },
        { label: "대학교 졸업", value: "대학교 졸업" },
        { label: "대학원 졸업", value: "대학원 졸업" },
    ];

    const bankOptions = [
        { label: "선택", value: "" },
        { label: "국민은행", value: "국민은행" },
        { label: "신한은행", value: "신한은행" },
        { label: "우리은행", value: "우리은행" },
        { label: "하나은행", value: "하나은행" },
        { label: "농협은행", value: "농협은행" },
        { label: "기업은행", value: "기업은행" },
        { label: "카카오뱅크", value: "카카오뱅크" },
        { label: "토스뱅크", value: "토스뱅크" },
        { label: "새마을금고", value: "새마을금고" },
    ];

    const sexOptionse = [
        { label: "선택", value: "" },
        { label: "여성", value: "여성" },
        { label: "남성", value: "남성" },
    ];

    const jobGradeOptions = setSelectOption(JobGradeGroupItem, "jobGradeDetailName", "jobGradeDetailName", {
        label: "전체",
        value: "",
    });

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

    //  파일 업로드 핸들링
    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && ["jpg", "gif", "png"].includes(file.name.split(".").pop()?.toLowerCase()!)) {
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const saveEmployee = async () => {
        const formData = new FormData(formRef.current!);

        // 필수 항목 검증
        const employeeName = formData.get("employeeName")?.toString().trim();
        const registrationNumber = formData.get("registrationNumber")?.toString().trim();
        const hp = formData.get("hp")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const birthday = formData.get("birthday")?.toString().trim();

        const employeeData = {
            employeeName,
            registrationNumber,
            hp,
            email,
            birthday,
        };

        if (!validateEmployeeForm(employeeData)) {
            return;
        }

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
                                <th>이름</th>
                                <td>
                                    <StyledInput type='text' name='employeeName' />
                                </td>
                                <th>주민번호</th>
                                <td>
                                    <StyledInput type='text' name='registrationNumber' />
                                </td>
                            </tr>
                            {/* 2 */}
                            <tr>
                                <th>생년월일</th>
                                <td>
                                    <StyledInput type='date' name='birthday' />
                                </td>
                                <th>성별</th>
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
                                <th>최종학력</th>
                                <td>
                                    <StyledSelectBox
                                        options={educationOptions}
                                        value={selectedEducation}
                                        onChange={setSelectedEducation}
                                    />
                                    <StyledInput type='hidden' name='finalEducation' value={selectedEducation} />
                                </td>
                                <th>이메일</th>
                                <td>
                                    <StyledInput type='email' name='email' />
                                </td>
                            </tr>
                            {/* 4 */}
                            <tr>
                                <th>연락처</th>
                                <td>
                                    <StyledInput type='tel' name='hp' />
                                </td>
                                <th>우편번호</th>
                                <td>
                                    <StyledInput type='text' name='zipCode' value={zipCode} readOnly />
                                    <StyledButton
                                        type='button'
                                        onClick={() => setIsOpen(true)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        주소 검색
                                    </StyledButton>
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <StyledInput type='text' name='address' value={address} readOnly />
                                </td>
                                <th>상세주소</th>
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
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "20%",
                                        left: "30%",
                                        width: "500px",
                                        height: "600px",
                                        zIndex: 100,
                                        border: "1px solid #ccc",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <DaumPostcode onComplete={handleComplete} autoClose />
                                </div>
                            )}

                            {/* 6 */}
                            <tr>
                                <th>은행</th>
                                <td>
                                    <StyledSelectBox
                                        options={bankOptions}
                                        value={selectedBank}
                                        onChange={setSelectedBank}
                                    />
                                    <StyledInput type='hidden' name='bank' value={selectedBank} />
                                </td>

                                <th>계좌번호</th>
                                <td>
                                    <StyledInput type='text' name='bankAccount' />
                                </td>
                            </tr>

                            <tr>
                                <th>입사일자</th>
                                <td>
                                    <StyledInput type='date' name='regDate' />
                                </td>{" "}
                                <th>부서</th>
                                <td>
                                    <StyledSelectBox
                                        options={departmentOptions}
                                        value={selectedDepartment}
                                        onChange={setSelectedDepartment}
                                    />
                                    <StyledInput type='hidden' name='departmentDetailName' value={selectedDepartment} />
                                </td>
                            </tr>

                            <tr>
                                <th>직급</th>
                                <td>
                                    <StyledSelectBox
                                        options={jobGradeOptions}
                                        value={selectedJobGrade}
                                        onChange={setSelectedJobGrade}
                                    />
                                    <StyledInput type='hidden' name='jobGradeDetailName' value={selectedJobGrade} />
                                </td>
                                <th>직무</th>
                                <td>
                                    <StyledInput type='text' name='jobRoleDetailName' />
                                </td>
                            </tr>
                            {/* 10 */}
                            <tr>
                                <th>지급일자</th>
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
                                <th>사진</th>
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
