import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { ClientListSearchStyled } from "./styled";
import { IClient, IClientResponse } from "../ClientListMain/ClientListMain";
import { useContext, useEffect, useState } from "react";
import { ClientListContext } from "../../../../../../api/Provider/SalaryMangerProvider/ClientListProvider";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";

export const ClientListSearch = () => {
    const [clientList, setClientList] = useState<IClient[]>([]);
    // const [selectClient, setSelectClient] = useState<string>("");
    // const [selectDate, setSelectDate] = useState<string>("");

    const { setSearchKeyword } = useContext(ClientListContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);

    //
    const [inputs, setInputs] = useState({
        client: "",
        date: "",
    });

    const { client, date } = inputs; // 비구조화 할당, 값 추출

    const displayText = (e: any) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const onReset = (e: any) => {
        setInputs({
            client: "",
            date: "",
        });
    };

    useEffect(() => {
        getClientList();
    }, []);

    const getClientList = () => {
        axios.post("/business/client-list/getClientListBody.do", {}).then((res: AxiosResponse<IClientResponse>) => {
            setClientList(res.data.clientList);
        });
    };

    const handlerClientSearch = () => {
        if (!inputs.client && !inputs.date) {
            alert("검색 정보를 입력 하세요.");
            return;
        }

        setSearchKeyword({
            client_name: inputs.client,
            cust_update_date: inputs.date,
        });
    };

    return (
        <ClientListSearchStyled>
            <label>
                거래처
                <StyledInput
                    type='text'
                    name='client'
                    list='searchClientOptions'
                    value={client}
                    onChange={displayText}
                />
                <datalist id='searchClientOptions'>
                    {clientList.map((client, id) => (
                        <option key={id} value={client.client_name} />
                    ))}
                </datalist>
            </label>
            <label>
                날짜
                <StyledInput type='date' name='date' value={date} onChange={(e) => displayText(e)} />
            </label>
            <StyledButton onClick={handlerClientSearch}>조회</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
            <img src='/refresh.png' onClick={onReset} style={{ width: "25px", height: "25px" }} />
        </ClientListSearchStyled>
    );
};
