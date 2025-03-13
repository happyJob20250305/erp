import { Form, FormLabel } from "react-bootstrap";
import { StyledInputStyled } from "../../../../common/StyledInput/styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { EmployeeRegisterModalStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";
import { postApi, postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import { Employee, SalaryOptionList } from "../../../../../api/api";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { IEmployeeRegisterResponse } from "../../../../../models/interface/personnel/employee/IEmployeeRegisterResponse";

export const EmployeeRegisterModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    // form data 상태 관리
    const formRef = useRef<HTMLFormElement>();
    //DepartmentGroupItem
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);

    //JobGradeGroupItem
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);

    // 셀렉트 박스 선택 값 (별도 상태로 관리)
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedJobGrade, setSelectedJobGrade] = useState("");

    //이미지 등록 관련 변수
    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    if (!modal) return null; // 모달이 false면 렌더링하지 않음
    const closeModal = () => {
        setModal(!modal);
    };

    // 컴포넌트 마운트 시점에 옵션 목록 조회
    useEffect(() => {
        getOptionList();
    }, []);

    const getOptionList = async () => {
        const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);

        if (result) {
            setDepartmentGroupItem(result.DepartmentGroupList);
            setGradeGroupItem(result.JobGradeGroupList);
            console.log(result);
        }
    };

    // 2) SelectBox에서 사용할 옵션 배열 생성
    //    (label, value) 형태를 StyledSelectBox에 맞춰 변환
    const departmentOptions = DepartmentGroupItem.map((item) => ({
        label: item.departmentDetailName,
        value: item.departmentDetailName,
    }));

    const jobGradeOptions = JobGradeGroupItem.map((item) => ({
        label: item.jobGradeDetailName,
        value: item.jobGradeDetailName,
    }));

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length > 0) {
            const fileSplit = fileInfo[0].name.split(".");
            const fileExt = fileSplit[1].toLocaleLowerCase(); // 소문자로 통일

            if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            }
        }
    };

    const fileDownload = () => {};

    const saveEmployee = async () => {
        const formData = new FormData(formRef.current);
        console.log(formData);

        try {
            const result = await postApi<IEmployeeRegisterResponse>(Employee.employeeSave, formData);
            alert("저장되었습니다.");
        } catch {
            alert("저장 실패");
        }
    };

    return (
        <>
            <EmployeeRegisterModalStyled>
                <div className='container'>
                    <form ref={formRef}>
                        {/* 파일 첨부 */}
                        <div style={{ marginBottom: "10px" }}>
                            파일 :
                            <StyledInput
                                type='file'
                                name='file'
                                id='fileInput'
                                style={{ display: "none" }}
                                onChange={handlerFile}
                            />
                            <label className='img-label' htmlFor='fileInput'>
                                파일 첨부하기
                            </label>
                            <div>
                                {imageUrl ? (
                                    <div>
                                        <label>미리보기</label>
                                        <img onClick={fileDownload} src={imageUrl} />
                                        {fileName}
                                    </div>
                                ) : (
                                    <div>{fileName}</div>
                                )}
                            </div>
                        </div>

                        {/* 첫 번째 줄: 이름, 주민번호, 생년월일, 성별 */}
                        <div style={{ display: "flex", gap: "10px" }}>
                            <label>
                                이름: <StyledInput type='text' name='employeeName' />
                            </label>
                            <label>
                                주민번호: <StyledInput type='text' name='registrationNumber' />
                            </label>
                            <label>
                                생년월일: <StyledInput type='date' name='birthday' />
                            </label>
                            <label>
                                성별: 남성 <input type='radio' name='sex' value='남자' /> 여성{" "}
                                <input type='radio' name='sex' value='여자' />
                            </label>
                            <label>
                                최종학력: <StyledInput type='text' name='finalEducation' />
                            </label>
                        </div>

                        {/* 두 번째 줄: 이메일, 연락처, 우편번호, 주소 */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <label>
                                이메일: <StyledInput type='email' name='email' />
                            </label>
                            <label>
                                연락처: <StyledInput type='tel' name='hp' />
                            </label>
                            <label>
                                우편번호: <StyledInput type='text' name='zipCode' />
                            </label>
                            <label>
                                주소: <StyledInput type='text' name='address' />
                            </label>
                        </div>

                        {/* 세 번째 줄: 상세주소, 은행, 계좌번호 */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <label>
                                상세주소: <StyledInput type='text' name='addressDetail' />
                            </label>
                            <label>
                                은행: <StyledInput type='text' name='bank' />
                            </label>
                            <label>
                                계좌번호: <StyledInput type='text' name='bankAccount' />
                            </label>
                        </div>

                        {/* 네 번째 줄: 입사일자, 연봉, 재직부서, 직급 */}

                        <label>
                            입사 일자: <StyledInput type='date' name='regDate' />
                        </label>
                        <label>
                            연봉: <StyledInput type='text' name='salary' />
                        </label>
                        <div style={{ marginLeft: "20px" }}>
                            <label>부서</label>
                            <StyledSelectBox
                                options={departmentOptions}
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                            />
                            <StyledInput type='hidden' name='departmentDetailName' value={selectedDepartment} />
                            <label>직급 </label>
                            <StyledSelectBox
                                options={jobGradeOptions}
                                value={selectedJobGrade}
                                onChange={setSelectedJobGrade}
                            />

                            <StyledInput type='hidden' name='jobGradeDetailName' value={selectedJobGrade} />
                        </div>

                        {/* 다섯 번째 줄: 직무, 지급일자 */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <label>
                                직무: <StyledInput type='text' name='jobRoleDetailName' />
                            </label>
                            <label>
                                지급일자: <StyledInput type='date' name='paymentDate' />
                            </label>
                        </div>

                        {/* 기타 */}
                        <div style={{ marginTop: "10px" }}>
                            <label>
                                기타: <StyledInput type='text' name='empMemo' />
                            </label>
                        </div>

                        {/* hidden 필드 */}
                        <input type='hidden' name='emplStatus' value='W' />

                        {/* 버튼 */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
                            <StyledButton type='submit' onClick={saveEmployee}>
                                등록
                            </StyledButton>
                            <StyledButton type='button' onClick={closeModal}>
                                취소
                            </StyledButton>
                        </div>
                    </form>
                </div>
            </EmployeeRegisterModalStyled>
        </>
    );
};
