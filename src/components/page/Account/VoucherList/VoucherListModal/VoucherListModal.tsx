import { FC, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ButtonArea, ModalOverlay, ModalStyledTable, VoucherListModalStyle } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useReactToPrint } from "react-to-print";
import { IVoucher } from "../../../../../models/interface/account/voucherList/IVoucher";

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
                                <td>{voucherDetail?.voucher_no}</td>
                                <th scope='row'>구분</th>
                                <td>{voucherDetail?.account_type}</td>
                                <th scope='row'>담당자</th>
                                <td>{voucherDetail?.emp_name}</td>
                                <th scope='row'>일자 </th>
                                <td>{voucherDetail?.voucher_date}</td>
                            </tr>
                            <tr>
                                <th scope='row'>거래처</th>
                                <td>{voucherDetail?.client_name}</td>
                                <th scope='row'>주문번호</th>
                                <td>{voucherDetail?.order_id}</td>
                                <th scope='row'>지출번호</th>
                                <td>{voucherDetail?.exp_id || "-"}</td>
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
                                <td colSpan={2}>{voucherDetail?.voucher_amount}</td>
                                <td colSpan={2}>0</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>{voucherDetail?.crebit_name}</td>
                                <td colSpan={2}>0</td>
                                <td colSpan={2}>{voucherDetail?.voucher_amount}</td>
                            </tr>
                            <tr>
                                <th scope='row' colSpan={4}>
                                    합계
                                </th>
                                <th scope='row' colSpan={2}>
                                    {voucherDetail?.voucher_amount}
                                </th>
                                <th scope='row' colSpan={2}>
                                    {voucherDetail?.voucher_amount}
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
