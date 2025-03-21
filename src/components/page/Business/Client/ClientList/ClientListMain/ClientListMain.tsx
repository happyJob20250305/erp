import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../../common/StyledTable/StyledTable";
import { ClientListMainStyled } from "./styled";
import { ClientListContext } from "../../../../../../api/Provider/SalaryMangerProvider/ClientListProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { Portal } from "../../../../../common/potal/Portal";
import { ClientListModal } from "../ClientListModal/ClientListModal";

export interface IClient {
    zip: string;
    biz_num: string;
    memo: string;
    bank: string;
    person: string;
    ph: string;
    person_ph: string;
    detail_addr: string;
    id: string;
    addr: string;
    client_name: string;
    email: string;
    bank_account: string;
    cust_update_date: string;
}

export interface IClientResponse {
    clientList: IClient[];
}

export interface IGetClient {
    client_id: string;
    client_name: string;
}

export interface IGetClientResponse {
    clientList: IGetClient[];
}
export const ClientListMain = () => {
    const [clientList, setClientList] = useState<IClient[]>([]);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    const [detailClient, setDetailClient] = useState<IClient>();

    const { searchKeyword } = useContext(ClientListContext);

    useEffect(() => {
        searchClientList();
    }, [searchKeyword]);

    const columns = [
        { key: "id", title: "번호" },
        { key: "cust_update_date", title: "날짜" },
        { key: "client_name", title: "거래처 이름" },
        { key: "person", title: "담당자" },
        { key: "ph", title: "전화번호" },
        { key: "person_ph", title: "핸드폰" },
        { key: "email", title: "이메일" },
        { key: "addr", title: "주소" },
        { key: "memo", title: "메모" },
    ] as Column<IClient>[];

    const searchClientList = () => {
        axios
            .post("/business/client-list/searchClientListBody.do", {
                ...searchKeyword,
            })
            .then((res: AxiosResponse<IClientResponse>) => {
                setClientList(res.data.clientList);
            });
    };

    const handlerClientModal = (row: IClient) => {
        setModal(!modal);
        setDetailClient(row);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchClientList();
    };

    return (
        <ClientListMainStyled>
            <StyledTable
                data={clientList}
                columns={columns}
                hoverable={true}
                fullWidth={true}
                onCellClick={(row) => {
                    handlerClientModal(row);
                }}
            />
            {modal && (
                <Portal>
                    <ClientListModal
                        detailClient={detailClient}
                        setDetailClient={setDetailClient}
                        postSuccess={postSuccess}
                    />
                </Portal>
            )}
        </ClientListMainStyled>
    );
};
