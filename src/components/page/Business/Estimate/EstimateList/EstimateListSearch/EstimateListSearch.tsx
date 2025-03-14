import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { EstimateListSearchStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { EstimateListContext } from "../../../../../../api/Provider/EstimateListProvider";

interface IClientList {
    name: string;
    id: number;
}

interface IClientListResponse {
    clientNameList: IClientList[];
    clientNamseCnt: number;
}

interface IProductList {
    name: string;
    id: number;
}

interface IProductListResponse {
    productNameList: IProductList[];
    productNamseCnt: number;
}

export const EstimateListSearch = () => {
    const [selectEstimateDate, setSelectEstimateDate] = useState<string>("");
    const [selectdeliveryDate, setSelectDeliveryDate] = useState<string>("");
    const [clientList, setClientList] = useState<IClientList[]>([]);
    const [productList, setProductList] = useState<IProductList[]>([]);
    const [selectClientId, setSelectClientId] = useState<string>("");
    const [selectProductId, setSelectProductId] = useState<string>("");

    const { setSearchKeyword } = useContext(EstimateListContext);

    useEffect(() => {
        getClientName();
        getProductName();
    }, []);
    const getClientName = () => {
        axios.post("/business/estimate-list/clientNamesBody.do").then((res: AxiosResponse<IClientListResponse>) => {
            console.log("res.data.clientNamesList:" + res.data.clientNameList);
            setClientList(res.data.clientNameList);
        });
    };

    const getProductName = () => {
        axios.post("/business/estimate-list/productNamesBody.do").then((res: AxiosResponse<IProductListResponse>) => {
            console.log("res.data.productNamesList:" + res.data.productNameList);
            setProductList(res.data.productNameList);
        });
    };

    const clientOptions = [
        { value: "", label: "선택" },
        ...(clientList?.length > 0
            ? clientList.map((clientNamesValue: IClientList) => ({
                  value: clientNamesValue.id,
                  label: clientNamesValue.name,
              }))
            : []),
    ];

    const productOptions = [
        { value: "", label: "선택" },
        ...(productList?.length > 0
            ? productList.map((productNamesValue: IProductList) => ({
                  value: productNamesValue.id,
                  label: productNamesValue.name,
              }))
            : []),
    ];

    const handlerSearchEstimateList = () => {
        setSearchKeyword({
            searchEstimateDate: selectEstimateDate,
            searchDeliveryDate: selectdeliveryDate,
            searchClientId: selectClientId,
            searchProductId: selectProductId,
        });
    };
    return (
        <EstimateListSearchStyled>
            <label>
                거래처
                <StyledSelectBox
                    options={clientOptions}
                    value={selectClientId}
                    onChange={(value: string) => {
                        setSelectClientId(value);
                    }}
                />
            </label>
            <label>
                제품
                <StyledSelectBox
                    options={productOptions}
                    value={selectProductId}
                    onChange={(value: string) => {
                        setSelectProductId(value);
                    }}
                />
            </label>
            <label>
                견적날짜
                <StyledInput type='date' onChange={(e) => setSelectEstimateDate(e.target.value)} />
            </label>
            <label>
                납기날짜
                <StyledInput type='date' onChange={(e) => setSelectDeliveryDate(e.target.value)} />
            </label>
            <StyledButton onClick={handlerSearchEstimateList}>조회</StyledButton>
        </EstimateListSearchStyled>
    );
};
