import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { IReceivablesDetail, IReceivablesListDetail } from "../../../../../models/interface/IReceivablesList";
import axios, { AxiosResponse } from "axios";
import { ReceivablesModalStyled } from "./styled";
import { ReceivablesTable } from "./ReceivablesTable";

interface IReceivablesListModalProps {
    postSuccess: () => void;
    orderId: number;
    setOrderId: React.Dispatch<React.SetStateAction<number>>;
}

export const ReceivablesModal: FC<IReceivablesListModalProps> = ({ orderId, setOrderId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<IReceivablesListDetail[]>([]);

    useEffect(() => {
        orderId && receivablesModal();

        return () => {
            setOrderId(0);
        };
    }, []);

    const receivablesModal = () => {
        axios.post("/sales/receivableDetail.do", { orderId }).then((res: AxiosResponse<IReceivablesDetail>) => {
            if (res.data.detailList) {
                setDetail([res.data.detailList]);
            }
        });
    };
    const handlerRowClick = (selectedOrderId: number) => {};

    return (
        <ReceivablesModalStyled>
            <h2>미수금 상세 내역</h2>
            <ReceivablesTable data={detail} onRowClick={handlerRowClick} />
        </ReceivablesModalStyled>
    );
};
