import { FC, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ButtonArea, ModalOverlay, ModalStyledTable, VoucherListModalStyle } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useReactToPrint } from "react-to-print";
import { IVoucher } from "../../../../../models/interface/account/voucherList/IVoucher";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";

interface IVoucherListModalProps {
    voucherDetail: IVoucher;
}
export const VoucherListModal: FC<IVoucherListModalProps> = ({ voucherDetail }) => {
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
                                    <StyledInput defaultValue={voucherDetail?.voucher_no} width={150}></StyledInput>
                                </td>
                                <th scope='row'>구분</th>
                                <td>
                                    <StyledInput defaultValue={voucherDetail?.account_type} width={100}></StyledInput>
                                </td>
                                <th scope='row'>담당자</th>
                                <td>
                                    <StyledInput defaultValue={voucherDetail?.emp_name} width={100}></StyledInput>
                                </td>
                                <th scope='row'>일자 </th>
                                <td>
                                    <StyledInput defaultValue={voucherDetail?.voucher_date} width={150}></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>거래처</th>
                                <td>
                                    <StyledInput defaultValue={voucherDetail?.client_name} width={150}></StyledInput>
                                </td>
                                <th scope='row'>주문번호</th>
                                <td>
                                    <StyledInput defaultValue={voucherDetail?.order_id} width={100}></StyledInput>
                                </td>
                                <th scope='row'>지출번호</th>
                                <td>
                                    <StyledInput defaultValue={voucherDetail?.exp_id || "-"} width={100}></StyledInput>
                                </td>
                                <td colSpan={2}></td>
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
                                <td colSpan={4}>{voucherDetail?.debit_name}</td>
                                <td colSpan={2}>
                                    <StyledInput
                                        defaultValue={voucherDetail?.voucher_amount.toLocaleString("ko-KR")}
                                    ></StyledInput>
                                </td>
                                <td colSpan={2}>0</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>{voucherDetail?.crebit_name}</td>
                                <td colSpan={2}>0</td>
                                <td colSpan={2}>
                                    <StyledInput
                                        defaultValue={voucherDetail?.voucher_amount.toLocaleString("ko-KR")}
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row' colSpan={4}>
                                    합계
                                </th>
                                <th scope='row' colSpan={2}>
                                    <StyledInput
                                        defaultValue={voucherDetail?.voucher_amount.toLocaleString("ko-KR")}
                                    ></StyledInput>
                                </th>
                                <th scope='row' colSpan={2}>
                                    <StyledInput
                                        defaultValue={voucherDetail?.voucher_amount.toLocaleString("ko-KR")}
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
