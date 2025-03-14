import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { IReceivablesDetail, IReceivablesListDetail } from "../../../../../models/interface/sales/IReceivablesList";
import { ReceivablesModalStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { searchApi } from "../../../../../api/SalesApi/ReceivablesListApi/searchApi";
import { ReceivablesList } from "../../../../../api/api";
import { StyledTable } from "../../../../common/styled/StyledTable";

interface IReceivablesListModalProps {
    postSuccess: () => void;
    orderId: number;
    setOrderId: React.Dispatch<React.SetStateAction<number>>;
}

export const ReceivablesModal: FC<IReceivablesListModalProps> = ({ orderId, setOrderId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<IReceivablesListDetail>();
    const [detailList, setDetailList] = useState<IReceivablesListDetail[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const [cPage, setCPage] = useState<number>(0);
    useEffect(() => {
        orderId && receivablesModal();

        return () => {
            setOrderId(0);
        };
    }, []);

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

    return (
        <ReceivablesModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <tr>
                        <td>수주일자</td>
                        <StyledInput type='text' name='orderDate' defaultValue={detail?.orderDate}></StyledInput>
                        <td>납품일자</td>
                        <StyledInput type='text' name='deliveryDate' defaultValue={detail?.deliveryDate}></StyledInput>
                    </tr>
                    <tr>
                        <td>처리부서</td>
                        <StyledInput
                            type='text'
                            name='departmentName'
                            defaultValue={detail?.departmentName}
                        ></StyledInput>
                        <td>전표번호</td>
                        <StyledInput type='text' name='voucherNo' defaultValue={detail?.voucherNo}></StyledInput>
                    </tr>
                    <StyledTable>
                        <tr>
                            <td>번호</td>
                            <td>제품명</td>
                            <td>수량</td>
                            <td>공급가</td>
                            <td>제품단가</td>
                            <td>공급합계</td>
                        </tr>
                        {detailList?.length > 0 ? (
                            detailList.map((receive) => {
                                return (
                                    <tr key={receive.orderId}>
                                        <td>{receive?.orderId}</td>
                                        <td>{receive?.productName}</td>
                                        <td>{receive?.quantity}</td>
                                        <td>{receive?.supplyPrice.toString()}</td>
                                        <td>{receive?.unitPrice.toString()}</td>
                                        <td>{receive?.totalSupplyPrice.toString()}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6}>데이터가 없습니다.</td>
                            </tr>
                        )}
                    </StyledTable>
                    <tr>
                        <td>총 납품개수</td>
                        <StyledInput
                            type='text'
                            name='orderDate'
                            defaultValue={detail?.totalDeliveryCount.toString()}
                        ></StyledInput>
                        <td>총 공급가</td>
                        <StyledInput
                            type='text'
                            name='deliveryDate'
                            defaultValue={detail?.totalSupplyPrice.toString()}
                        ></StyledInput>
                    </tr>
                    <tr>
                        <td>총 세액</td>
                        <StyledInput
                            type='text'
                            name='departmentName'
                            defaultValue={detail?.departmentName}
                        ></StyledInput>
                        <td>총 금액(공급가+세액)</td>
                        <StyledInput
                            type='text'
                            name='voucherNo'
                            defaultValue={detail?.depositAmount.toString()}
                        ></StyledInput>
                    </tr>
                    <tr>
                        <td>수납상태</td>
                        <StyledInput type='text' name='orderDate' defaultValue={detail?.receivableStatus}></StyledInput>
                        <td>미납액</td>
                        <StyledInput
                            type='text'
                            name='deliveryDate'
                            defaultValue={detail?.totalReceivableAmount.toString()}
                        ></StyledInput>
                    </tr>
                    <h2>거래처 정보</h2>
                    <div className='client-info'>
                        <tr>
                            <td>거래처명</td>
                            <StyledInput
                                type='text'
                                name='deliveryDate'
                                defaultValue={detail?.clientName}
                            ></StyledInput>
                            <td>담당자</td>
                            <StyledInput type='text' name='deliveryDate' defaultValue={detail?.person}></StyledInput>
                            <td>연락처</td>
                            <StyledInput type='text' name='deliveryDate' defaultValue={detail?.personPh}></StyledInput>
                        </tr>
                    </div>
                    <h2>처리자</h2>
                    <tr>
                        <td>처리자</td>
                        <StyledInput type='text' name='deliveryDate' defaultValue={detail?.managerName}></StyledInput>
                    </tr>
                    <StyledButton type='button' onClick={() => setModal(!modal)}>
                        나가기
                    </StyledButton>
                </form>
            </div>
        </ReceivablesModalStyled>
    );
};
