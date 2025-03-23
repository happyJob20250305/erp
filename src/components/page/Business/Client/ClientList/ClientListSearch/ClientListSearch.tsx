import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { ClientListSearchStyled } from "./styled";
import { IClient, IClientResponse } from "../ClientListMain/ClientListMain";
import { useContext, useEffect, useState } from "react";
import { ClientListContext } from "../../../../../../api/Provider/SalaryMangerProvider/ClientListProvider";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";

export const ClientListSearch = () => {
    const [clientList, setClientList] = useState<IClient[]>([]);
    const [selectClient, setSelectClient] = useState<string>("");
    const [selectDate, setSelectDate] = useState<string>("");

    const { setSearchKeyword } = useContext(ClientListContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        getClientList();
    }, []);

    const getClientList = () => {
        axios.post("/business/client-list/getClientListBody.do").then((res: AxiosResponse<IClientResponse>) => {
            setClientList(res.data.clientList);
        });
    };

    const handlerClientSearch = () => {
        if (!selectClient && !selectDate) {
            alert("거래처를 입력 하세요.");
            return;
        }

        let clientFound = false;

        clientList.forEach((client) => {
            if (client.client_name.includes(selectClient)) {
                clientFound = true;
            }
        });

        setSearchKeyword({
            client_name: selectClient,
            cust_update_date: selectDate,
        });
    };

    const resetSearch = () => {
        setSearchKeyword({});
        setSelectClient("");
        setSelectDate("");
    };

    return (
        <ClientListSearchStyled>
            <label>
                거래처
                <StyledInput
                    type='text'
                    list='searchClientOptions'
                    value={selectClient}
                    onChange={(e) => setSelectClient(e.target.value)}
                />
                <datalist id='searchClientOptions'>
                    {clientList.map((client) => (
                        <option key={client.client_id} value={client.client_name} />
                    ))}
                </datalist>
            </label>
            <label>
                날짜
                <StyledInput type='date' onChange={(e) => setSelectDate(e.target.value)} />
            </label>
            <StyledButton onClick={handlerClientSearch}>조회</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
            <img src='/refresh.png' onClick={resetSearch} style={{ width: "25px", height: "25px" }} />
        </ClientListSearchStyled>
    );
};
