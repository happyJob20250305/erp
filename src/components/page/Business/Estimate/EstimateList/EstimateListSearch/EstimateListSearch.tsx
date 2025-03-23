import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { EstimateListSearchStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { EstimateListContext } from "../../../../../../api/Provider/EstimateListProvider";
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

export const EstimateListSearch = () => {
    const [selectEstimateDate, setSelectEstimateDate] = useState<string>("");
    const [selectDeliveryDate, setSelectDeliveryDate] = useState<string>("");
    const [clientList, setClientList] = useState<IClient[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [selectClientId, setSelectClientId] = useState<string>("");
    const [selectProductId, setSelectProductId] = useState<string>("");

    const { setSearchKeyword } = useContext(EstimateListContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        getClientName();
        getProductName();
    }, []);

    const getClientName = () => {
        axios.post("/business/estimate-list/clientNamesBody.do").then((res: AxiosResponse<IClientResponse>) => {
            setClientList(res.data.clientNameList);
        });
    };

    const getProductName = () => {
        axios.post("/business/estimate-list/productNamesBody.do").then((res: AxiosResponse<IProductResponse>) => {
            setProductList(res.data.productNameList);
        });
    };

    const clientOptions = [
        { value: "", label: "선택" },
        ...(clientList?.length > 0
            ? clientList.map((clientNamesValue: IClient) => ({
                  value: clientNamesValue.id,
                  label: clientNamesValue.name,
              }))
            : []),
    ];

    const productOptions = [
        { value: "", label: "선택" },
        ...(productList?.length > 0
            ? productList.map((productNamesValue: IProduct) => ({
                  value: productNamesValue.id,
                  label: productNamesValue.name,
              }))
            : []),
    ];

    const handlerSearchEstimateList = () => {
        let clientIdFound = "";

        if (selectClientId != "") {
            clientList.forEach((client) => {
                if (client.name.includes(selectClientId)) {
                    clientIdFound = client.id.toString();
                }
            });
        }

        let productIdFound = "";

        if (selectProductId != "") {
            productList.forEach((product) => {
                if (product.name.includes(selectProductId)) {
                    productIdFound = product.id.toString();
                }
            });
        }
        setSearchKeyword({
            searchEstimateDate: selectEstimateDate,
            searchDeliveryDate: selectDeliveryDate,
            searchClientId: clientIdFound,
            searchProductId: productIdFound,
        });
    };

    const resetSearch = () => {
        setSearchKeyword({});
        setSelectClientId("");
        setSelectProductId("");
        setSelectEstimateDate("");
        setSelectDeliveryDate("");
    };
    return (
        <EstimateListSearchStyled>
            <label>
                거래처
                <StyledInput
                    type='text'
                    list='searchClientIdOptions'
                    value={selectClientId}
                    onChange={(e) => setSelectClientId(e.target.value)}
                />
                <datalist id='searchClientIdOptions'>
                    {clientList.map((client) => (
                        <option key={client.id} value={client.name}></option>
                    ))}
                </datalist>
            </label>
            <label>
                제품
                <StyledInput
                    type='text'
                    list='searchProductIdOptions'
                    value={selectProductId}
                    onChange={(e) => setSelectProductId(e.target.value)}
                />
                <datalist id='searchProductIdOptions'>
                    {productList.map((product) => (
                        <option key={product.id} value={product.name} />
                    ))}
                </datalist>
            </label>
            <label>
                수주날짜
                <StyledInput type='date' onChange={(e) => setSelectEstimateDate(e.target.value)} />
            </label>
            <label>
                납기날짜
                <StyledInput type='date' onChange={(e) => setSelectDeliveryDate(e.target.value)} />
            </label>
            <StyledButton onClick={handlerSearchEstimateList}>조회</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
            <img src='/refresh.png' onClick={resetSearch} style={{ width: "25px", height: "25px" }} />
        </EstimateListSearchStyled>
    );
};
