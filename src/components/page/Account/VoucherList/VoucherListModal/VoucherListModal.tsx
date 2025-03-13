import { FC, useRef } from "react";
import { IVoucher } from "../VoucherListMain/VoucherListMain";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ButtonArea, ModalOverlay, ModalStyledTable, VoucherListModalStyle } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { useReactToPrint } from "react-to-print";

interface IVoucherListModalProps {
    voucherDetail: IVoucher;
    setVoucherDetail: (expenseDetail: IVoucher) => void;
}
export const VoucherListModal: FC<IVoucherListModalProps> = ({ voucherDetail, setVoucherDetail }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <>
            <ModalOverlay />
            <VoucherListModalStyle>
                <h3>회계전표 상세</h3>
                <form ref={contentRef}>
                    <ModalStyledTable>
                        <tbody>
                            <tr>
                                <th scope='row'>전표번호</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='voucher_no'
                                        defaultValue={voucherDetail?.voucher_no}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th scope='row'>구분</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='account_type'
                                        defaultValue={voucherDetail?.account_type}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th scope='row'>담당자</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={voucherDetail?.emp_name}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th scope='row'>일자 </th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='voucher_date'
                                        defaultValue={voucherDetail?.voucher_date}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>거래처</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='client_name'
                                        defaultValue={voucherDetail?.client_name}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th scope='row'>주문번호</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='order_id'
                                        defaultValue={voucherDetail?.order_id}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <th scope='row'>지출번호</th>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='exp_id'
                                        defaultValue={voucherDetail?.exp_id || "-"}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr id='writer'>
                                <th scope='row' colSpan={4}>
                                    계정과목
                                </th>
                                <th scope='row' colSpan={2}>
                                    차변
                                </th>
                                <th scope='row' colSpan={2}>
                                    대변
                                </th>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <StyledInput
                                        type='text'
                                        name='debit_name'
                                        defaultValue={voucherDetail?.debit_name}
                                        size='small'
                                        width={450}
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <td colSpan={2}>
                                    <StyledInput
                                        type='text'
                                        name='voucher_amount'
                                        defaultValue={voucherDetail?.voucher_amount}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <td colSpan={2}>
                                    <StyledInput
                                        type='text'
                                        name='view__amount'
                                        defaultValue={0}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <StyledInput
                                        type='text'
                                        name='crebit_name'
                                        defaultValue={voucherDetail?.crebit_name}
                                        size='small'
                                        width={450}
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <td colSpan={2}>
                                    <StyledInput
                                        type='text'
                                        name='view__amount'
                                        defaultValue={0}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                                <td colSpan={2}>
                                    <StyledInput
                                        type='text'
                                        name='voucher_amount'
                                        defaultValue={voucherDetail?.voucher_amount}
                                        size='small'
                                        readOnly
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row' colSpan={4}>
                                    합계
                                </th>
                                <th scope='row' colSpan={2}>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={voucherDetail?.voucher_amount}
                                        readOnly
                                    ></StyledInput>
                                </th>
                                <th scope='row' colSpan={2}>
                                    <StyledInput
                                        type='text'
                                        name='emp_name'
                                        defaultValue={voucherDetail?.voucher_amount}
                                        readOnly
                                    ></StyledInput>
                                </th>
                            </tr>
                        </tbody>
                    </ModalStyledTable>
                </form>
                <ButtonArea>
                    <StyledButton type='button' onClick={() => reactToPrintFn()}>
                        인쇄
                    </StyledButton>
                    <StyledButton type='button' variant='secondary' onClick={() => setModal(!modal)}>
                        나가기
                    </StyledButton>
                </ButtonArea>
            </VoucherListModalStyle>
        </>
    );
};
