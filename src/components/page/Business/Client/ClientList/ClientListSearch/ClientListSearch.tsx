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
    const [selectclient, setSelectClient] = useState<string>("");
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

    const clientOptions = [
        { value: "", label: "선택" },
        ...(clientList?.length > 0
            ? clientList.map((clientValue: IClient) => ({
                  value: clientValue.client_name,
                  label: clientValue.client_name,
              }))
            : []),
    ];

    const handlerClientSearch = () => {
        setSearchKeyword({
            client_name: selectclient,
            cust_update_date: selectDate,
        });
    };

    return (
        <ClientListSearchStyled>
            <label>
                거래처
                <StyledSelectBox
                    options={clientOptions}
                    value={selectclient}
                    onChange={(value: string) => setSelectClient(value)}
                />
            </label>
            <label>
                날짜
                <StyledInput type='date' onChange={(e) => setSelectDate(e.target.value)} />
            </label>
            <StyledButton onClick={handlerClientSearch}>조회</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </ClientListSearchStyled>
    );
};
