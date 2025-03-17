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
import { IEmployee } from "../../../../../models/interface/personnel/employee/IEmployeeList";

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

    //  옵션 데이터 조회
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

    //  옵션 변환
    const departmentOptions = [
        { label: "전체", value: "" },
        ...DepartmentGroupItem.map((item) => ({ label: item.departmentDetailName, value: item.departmentDetailName })),
    ];
    const jobGradeOptions = [
        { label: "전체", value: "" },
        ...JobGradeGroupItem.map((item) => ({ label: item.jobGradeDetailName, value: item.jobGradeDetailName })),
    ];

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

        // 예: 필수 항목 체크
        if (!employeeName) {
            alert("이름을 입력해주세요.");
            return;
        }
        if (!registrationNumber) {
            alert("주민번호를 입력해주세요.");
            return;
        }
        if (!hp) {
            alert("연락처를 입력해주세요.");
            return;
        }
        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        // 추가로 정규표현식 등으로 이메일, 주민번호, 연락처 형식 검사 가능
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }

        try {
            const result = await postApi<IEmployeeRegisterResponse>(Employee.employeeSave, formData);
            alert("저장되었습니다.");
            postSuccess(); // 등록 성공 후 부모에 알림
        } catch {
            alert("저장 실패");
        }
    };

    //  모달 닫기
    const closeModal = () => setModal(false);

    //  모달 열려있을 때만 렌더링
    if (!modal) return null;

    return (
        <EmployeeRegisterModalStyled>
            <div className='container'>
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
                                    남 <input type='radio' name='sex' value='남자' /> 여{" "}
                                    <input type='radio' name='sex' value='여자' />
                                </td>
                            </tr>
                            {/* 3 */}
                            <tr>
                                <th>최종학력</th>
                                <td>
                                    <StyledInput type='text' name='finalEducation' />
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
                                    <StyledInput type='text' name='zipCode' />
                                </td>
                            </tr>
                            {/* 5 */}
                            <tr>
                                <th>주소</th>
                                <td>
                                    <StyledInput type='text' name='address' />
                                </td>
                                <th>상세주소</th>
                                <td>
                                    <StyledInput type='text' name='addressDetail' />
                                </td>
                            </tr>
                            {/* 6 */}
                            <tr>
                                <th>은행</th>
                                <td>
                                    <StyledInput type='text' name='bank' />
                                </td>
                                <th>계좌번호</th>
                                <td>
                                    <StyledInput type='text' name='bankAccount' />
                                </td>
                            </tr>
                            {/* 7 */}
                            <tr>
                                {/* <th>계좌번호</th>
                                <td>
                                    <StyledInput type='text' name='bankAccount' />
                                </td> */}
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
