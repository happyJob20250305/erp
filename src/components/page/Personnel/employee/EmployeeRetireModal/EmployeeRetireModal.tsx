import { FC, useContext, useRef } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { EmployeeRetirementModalContext } from "../../../../../api/Provider/EmployeeProvider/EmployeeRetirementModalProvider";
import { EmployeeRetireModalStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { postApi } from "../../../../../api/PersonnelApi/postApi";
import { Employee } from "../../../../../api/api";
import { ButtonArea, ModalStyledTable } from "../../../Account/VoucherList/VoucherListModal/styled";

interface IEmployeeRetireModalProps {
    postSuccess: () => void;
}

export const EmployeeRetireModal: FC<IEmployeeRetireModalProps> = ({ postSuccess }) => {
    const { dispatchKeyword } = useContext(EmployeeRetirementModalContext);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const formRef = useRef<HTMLFormElement>();

    const closeModal = () => {
        setModal(!modal);
    };

    const handleRetire = async () => {
        const formData = new FormData(formRef.current);
        console.log(formData);

        try {
            const result = await postApi<string>(Employee.emplStatusUpdate, formData);
            postSuccess();
            alert("수정되었습니다.");
        } catch {
            alert("수정 실패되었습니다.");
        }
    };

    return (
        <>
            <EmployeeRetireModalStyled>
                <div className='container'>
                    <h2>퇴직 처리</h2>
                    <form ref={formRef}>
                        <ModalStyledTable>
                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <th>사원번호</th>
                                    <td>
                                        <StyledInput value={dispatchKeyword.retireEmployeeNumber} readOnly />
                                        <StyledInput
                                            type='hidden'
                                            name='employeeId'
                                            value={dispatchKeyword.retireEmployeeId}
                                        />
                                        <StyledInput type='hidden' name='emplStatus' value='F' />
                                        <StyledInput type='hidden' name='salary' value='' />
                                    </td>
                                    <th>사원명</th>
                                    <td>
                                        <StyledInput
                                            value={dispatchKeyword.retireEmployeeName}
                                            name='employeeNumber'
                                            readOnly
                                        />
                                    </td>
                                </tr>
                                {/* 2 */}
                                <tr>
                                    <th>입사일자</th>
                                    <td>
                                        <StyledInput value={dispatchKeyword.regDate} name='regData' readOnly />
                                    </td>
                                    <th>퇴직금</th>
                                    <td>
                                        <StyledInput type='text' name='severancePay' />
                                    </td>
                                </tr>
                                {/* 3 */}
                                <tr>
                                    <th>퇴사이유</th>
                                    <td colSpan={3}>
                                        <StyledInput type='text' name='resignationReason' />
                                    </td>
                                </tr>
                                {/* 4 */}
                                <tr>
                                    <th>퇴사일자</th>
                                    <td colSpan={3}>
                                        <StyledInput type='date' name='resignationDate' />
                                    </td>
                                </tr>
                            </tbody>
                        </ModalStyledTable>

                        {/* 버튼 */}
                        <ButtonArea>
                            <StyledButton type='button' onClick={handleRetire}>
                                퇴직
                            </StyledButton>
                            <StyledButton variant='secondary' type='button' onClick={closeModal}>
                                취소
                            </StyledButton>
                        </ButtonArea>
                    </form>
                </div>
            </EmployeeRetireModalStyled>
        </>
    );
};
