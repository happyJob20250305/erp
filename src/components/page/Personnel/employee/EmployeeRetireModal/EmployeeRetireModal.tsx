import { useContext, useRef } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { EmployeeRetirementModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeRetirementModalProvider";
import { EmployeeRetireModalStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { Employee } from "../../../../../api/api";

export const EmployeeRetireModal = () => {
    const {
        retireEmployeeId,
        setRetireEmployeeId,
        retireEmployeeNumber,
        setRetireEmployeeNumber,
        retireEmployeeName,
        setRetireEmployeeName,
        regDate,
        setRegDate,
    } = useContext(EmployeeRetirementModalContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);

    // form data 상태 관리
    const formRef = useRef<HTMLFormElement>();

    const closeModal = () => {
        setModal(!modal);
    };

    const handleRetire = async () => {
        const formData = new FormData(formRef.current);
        console.log(formData);

        try {
            const result = await postApi<string>(Employee.emplStatusUpdate, formData);
            alert("수정되었습니다.");
        } catch {
            alert("수정 실패되었습니다.");
        }
    };

    return (
        <>
            <EmployeeRetireModalStyled>
                <div className='container'>
                    <form ref={formRef}>
                        <label>사원번호</label>
                        <StyledInput value={retireEmployeeNumber} readOnly />
                        <StyledInput type='hidden' name='employeeId' value={retireEmployeeId} />
                        <StyledInput type='hidden' name='emplStatus' value='F' />
                        <StyledInput type='hidden' name='salary' value='' />
                        <label>사원명</label>
                        <StyledInput value={retireEmployeeName} name='employeeNumber' readOnly />
                        <label>입사일자</label>
                        <StyledInput value={regDate} name='regData' readOnly />
                        <label>퇴직금</label>
                        <StyledInput type='text' name='severancePay' />
                        <label>
                            퇴사이유: <StyledInput type='text' name='resignationReason' />
                        </label>
                        <label>
                            퇴사일자: <StyledInput type='date' name='resignationDate' />
                        </label>
                        <StyledButton type='submit' onClick={handleRetire}>
                            퇴직
                        </StyledButton>
                        <StyledButton type='button' onClick={closeModal}>
                            취소
                        </StyledButton>
                    </form>
                </div>
            </EmployeeRetireModalStyled>
        </>
    );
};
