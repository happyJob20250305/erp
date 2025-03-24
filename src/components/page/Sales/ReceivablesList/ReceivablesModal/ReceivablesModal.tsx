import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { IReceivablesDetail, IReceivablesListDetail } from "../../../../../models/interface/sales/IReceivablesList";
import { ReceivablesModalStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { ReceivablesList } from "../../../../../api/api";
import { ButtonArea } from "../../../Account/VoucherList/VoucherListModal/styled";
import { ReceivablesTable } from "./ReceivablesTable";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import { postApi } from "../../../../../api/SalesApi/postApi";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { searchApi } from "../../../../../api/SalesApi/searchApi";

interface IReceivablesListModalProps {
    postSuccess: () => void;
    orderId: number;
    setOrderId: React.Dispatch<React.SetStateAction<number>>;
}

export const ReceivablesModal: FC<IReceivablesListModalProps> = ({ orderId, setOrderId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<IReceivablesListDetail>();
    const [detailList, setDetailList] = useState<IReceivablesListDetail[]>([]);
    const loginUserInfo = useRecoilValue<ILoginInfo>(loginInfoState);
    const formRef = useRef<HTMLFormElement>(null);

    const [cPage, setCPage] = useState<number>(0);
    useEffect(() => {
        orderId && receivablesModal();

        return () => {
            setOrderId(0);
        };
    }, [orderId]);

    const receivablesModal = async (currentPage?: number) => {
        currentPage = currentPage || 1;
        const result = await searchApi<IReceivablesDetail>(ReceivablesList.detail, {
            orderId: orderId,
            currentPage,
            pageSize: 5,
        });
        if (result) {
            setDetail(result.detail);
            setDetailList(result.detailList);
            setCPage(currentPage);
        }
    };

    const saveDepositAmount = async () => {
        const formData = new FormData(formRef.current);

        const params = new URLSearchParams();

        const unpaidAmount = Number(detail?.totalReceivableAmount) || 0;
        const inputDepositAmount = Number(formData.get("depositAmount")) || 0;
        const updatedUnpaidAmount = unpaidAmount - inputDepositAmount;

        params.append("paymentAmount", inputDepositAmount.toString());
        params.append("unpaidAmount", updatedUnpaidAmount.toString());
        params.append("clientId", String(detail.clientId));

        params.append("orderId", orderId.toString());
        formData.forEach((value, key) => {
            params.append(key, value.toString());
        });

        const res = await postApi<IPostResponse>(ReceivablesList.saveDepositAmount, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (res.result === "success") {
            console.log(res.result);
            alert("입금처리가 완료되었습니다.");
            postSuccess();
        } else {
            alert("입금 처리에 실패했습니다.");
        }
    };

    return (
        <ReceivablesModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <table>
                        <tbody>
                            <tr key={orderId}>
                                <td>수주일자</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='orderDate'
                                        defaultValue={detail?.orderDate}
                                        disabled
                                    />
                                </td>
                                <td>납품일자</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='deliveryDate'
                                        defaultValue={detail?.deliveryDate}
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>처리부서</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='departmentName'
                                        defaultValue={detail?.departmentName}
                                        disabled
                                    />
                                </td>
                                <td>전표번호</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='voucherNo'
                                        defaultValue={detail?.voucherNo}
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <ReceivablesTable>
                        <thead>
                            <tr>
                                <td>번호</td>
                                <td>제품명</td>
                                <td>수량</td>
                                <td>공급가</td>
                                <td>제품단가</td>
                                <td>공급합계</td>
                            </tr>
                        </thead>
                        <tbody>
                            {detailList?.length > 0 ? (
                                detailList.map((receive) => (
                                    <tr key={receive.receivableId}>
                                        <td>{receive?.receivableId}</td>
                                        <td>{receive?.productName}</td>
                                        <td>{receive?.quantity}</td>
                                        <td>{receive?.supplyPrice.toString()}</td>
                                        <td>{receive?.unitPrice.toString()}</td>
                                        <td>{receive?.totalSupplyPrice.toString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center" }}>
                                        데이터가 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </ReceivablesTable>

                    <table>
                        <tbody>
                            <tr>
                                <td>총 납품개수</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='totalDeliveryCount'
                                        defaultValue={detail?.totalDeliveryCount.toString()}
                                        disabled
                                    />
                                </td>
                                <td>총 공급가</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='totalSupplyPrice'
                                        defaultValue={detail?.totalSupplyPrice.toString()}
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>총 세액</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='totalTax'
                                        defaultValue={detail?.totalTax.toString()}
                                        disabled
                                    />
                                </td>
                                <td>총 금액(공급가+세액)</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='depositAmount'
                                        defaultValue={detail?.depositAmount.toString()}
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>수납상태</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='receivableStatus'
                                        value={detail?.receivableStatus === "Y" ? "수금완료" : "미수금"}
                                        style={{ color: detail?.receivableStatus === "Y" ? "blue" : "red" }}
                                        disabled
                                    />
                                </td>
                                <td>미납액</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='totalReceivableAmount'
                                        value={detail?.totalReceivableAmount?.toString() || ""}
                                        style={{
                                            color:
                                                detail?.totalReceivableAmount && detail.totalReceivableAmount > 0
                                                    ? "red"
                                                    : "black",
                                        }}
                                        disabled
                                    />
                                </td>
                            </tr>
                            {loginUserInfo?.userType === "B" && (
                                <tr>
                                    <td>입금액</td>
                                    <td>
                                        <StyledInput
                                            type='text'
                                            name='depositAmount'
                                            value={detail?.receivableStatus === "Y" ? "" : undefined}
                                            disabled={detail?.receivableStatus === "Y"}
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <h2>거래처 정보</h2>
                    <table className='client-info'>
                        <tbody>
                            <tr>
                                <td>거래처명</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='clientName'
                                        defaultValue={detail?.clientName}
                                        disabled
                                    />
                                </td>
                                <td>담당자</td>
                                <td>
                                    <StyledInput type='text' name='person' defaultValue={detail?.person} disabled />
                                </td>
                                <td>연락처</td>
                                <td>
                                    <StyledInput type='text' name='personPh' defaultValue={detail?.personPh} disabled />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>처리자</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>처리자</td>
                                <td>
                                    <StyledInput
                                        type='text'
                                        name='managerName'
                                        value={
                                            detail?.managerName === null || detail?.managerName === ""
                                                ? "자동처리"
                                                : detail?.managerName
                                        }
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <ButtonArea>
                        {loginUserInfo?.userType === "B" ? (
                            <>
                                <StyledButton type='button' onClick={() => setModal(!modal)}>
                                    취소
                                </StyledButton>
                                <StyledButton type='button' onClick={saveDepositAmount}>
                                    직접입금
                                </StyledButton>
                            </>
                        ) : (
                            <StyledButton type='button' onClick={() => setModal(!modal)}>
                                취소
                            </StyledButton>
                        )}
                    </ButtonArea>
                </form>
            </div>
        </ReceivablesModalStyled>
    );
};
