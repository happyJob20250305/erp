import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { OrderListSearchstyled } from "./styled";
import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { OrderListContext } from "../../../../../../api/Provider/OrderListProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";

interface IClient {
    name: string;
    id: number;
}

interface IClientResponse {
    clientNameList: IClient[];
    clientNamseCnt: number;
}

interface IProduct {
    name: string;
    id: number;
}

interface IProductResponse {
    productNameList: IProduct[];
    productNamseCnt: number;
}

export const OrderListSearch = () => {
    const [selectorderDate, setSelectOrderDate] = useState<string>("");
    const [selectdeliveryDate, setSelectDeliveryDate] = useState<string>("");
    const [clientList, setClientList] = useState<IClient[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [selectClientId, setSelectClientId] = useState<string>("");
    const [selectProductId, setSelectProductId] = useState<string>("");

    const { setSearchKeyword } = useContext(OrderListContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        getClientName();
        getProductName();
    }, []);
    const getClientName = () => {
        axios
            .post("/business/order-information-list/clientNamesBody.do")
            .then((res: AxiosResponse<IClientResponse>) => {
                console.log("res.data.clientNamesList:" + res.data.clientNameList);
                setClientList(res.data.clientNameList);
            });
    };

    const getProductName = () => {
        axios
            .post("/business/order-information-list/productNamesBody.do")
            .then((res: AxiosResponse<IProductResponse>) => {
                console.log("res.data.productNamesList:" + res.data.productNameList);
                setProductList(res.data.productNameList);
            });
    };

    const clientNameOptions = [
        { value: "", label: "선택" },
        ...(clientList?.length > 0
            ? clientList.map((clientNamesValue: IClient) => ({
                  value: clientNamesValue.id,
                  label: clientNamesValue.name,
              }))
            : []),
    ];

    const productNamesOptions = [
        { value: "", label: "선택" },
        ...(productList?.length > 0
            ? productList.map((productNamesValue: IProduct) => ({
                  value: productNamesValue.id,
                  label: productNamesValue.name,
              }))
            : []),
    ];

    const handlerSearchOrderInfo = () => {
        setSearchKeyword({
            searchOrderDate: selectorderDate,
            searchDeliveryDate: selectdeliveryDate,
            searchClientId: selectClientId,
            searchProductId: selectProductId,
        });
    };

    return (
        <OrderListSearchstyled>
            <label>
                거래처
                <StyledSelectBox
                    options={clientNameOptions}
                    value={selectClientId}
                    onChange={(value: string) => {
                        setSelectClientId(value);
                    }}
                />
            </label>
            <label>
                제품
                <StyledSelectBox
                    options={productNamesOptions}
                    value={selectProductId}
                    onChange={(value: string) => {
                        setSelectProductId(value);
                    }}
                />
            </label>
            <label>
                수주날짜
                <StyledInput type='date' onChange={(e) => setSelectOrderDate(e.target.value)} />
            </label>
            <label>
                납기날짜
                <StyledInput type='date' onChange={(e) => setSelectDeliveryDate(e.target.value)} />
            </label>
            <StyledButton onClick={handlerSearchOrderInfo}>조회</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </OrderListSearchstyled>
    );
};
