import { FC, useEffect, useRef, useState } from "react";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { OrderListModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { IGetClient, IGetClientResponse } from "../../../Client/ClientList/ClientListMain/ClientListMain";
import {
    IMaincategory,
    IMaincategoryResponse,
    IManufacturer,
    IManufacturerResponse,
    IProduct,
    IProductResponse,
    ISubcategory,
    ISubcategoryResponse,
} from "../../../../../../models/interface/business/sales/ISales";
import axios, { AxiosResponse } from "axios";
import { StyledTable, StyledTd, StyledTh } from "../../../../../common/styled/StyledTable";
import { IOrder } from "../OrderListMain/OrderListMain";

interface IOrderInfo {
    productId: number;
    quantity: string;
    supplyPrice: string;
    unitPrice: string;
}

interface IOrderListModalProps {
    detailOrder: IOrder;
    setDetailOrder: (detailOrder?: IOrder) => void;
    postSuccess: () => void;
}

interface IPostResponse {
    result: "success" | "fail";
}

interface IArrOrderInfo extends IOrderInfo {}

export const OrderListModal: FC<IOrderListModalProps> = ({ detailOrder, setDetailOrder, postSuccess }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [clientList, setClientList] = useState<IGetClient[]>([]);
    const [manuFacturerList, setManuFacturerList] = useState<IManufacturer[]>([]);
    const [mainCategoryList, setMainCategoryList] = useState<IMaincategory[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<ISubcategory[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);

    const [selectOrderSalesArea, setSelectOrderSalesArea] = useState<string>("");
    const [selectclient, setSelectClient] = useState<string>("");
    const [selectManuFacturer, setSelectManuFacturer] = useState<string>("");
    const [selectMaincategory, setSelectMaincategory] = useState<string>("");
    const [selectSubcategory, setSelectSubcategory] = useState<string>("");
    const [selectProduct, setSelectProduct] = useState<string>("");

    const productIdRef = useRef<string>("");
    const quantityRef = useRef<HTMLInputElement>(null);
    const supplyPriceRef = useRef<HTMLInputElement>(null);
    const unitPriceRef = useRef<HTMLInputElement>(null);

    const [orderList, setOrderList] = useState<IOrderInfo[]>([]);

    useEffect(() => {
        getClientList();
        getManufacturerList();
        getMainCategoryList();
        getSubCategoryList();
        getProductList();

        // detailOrder.id && detailOrder();

        return () => {
            // setOrder
        };
    }, [selectclient, selectManuFacturer, selectMaincategory, selectSubcategory, selectProduct]);

    const orderSalesAreaOptions = [
        { label: "영업", value: "영업" },
        { label: "SCM", value: "SCM" },
    ];

    const clientOptions = [
        { value: "", label: "선택" },
        ...(clientList?.length > 0
            ? clientList.map((clientValue: IGetClient) => {
                  return {
                      value: clientValue.client_id,
                      label: clientValue.client_name,
                  };
              })
            : []),
    ];

    const manuFacturerOptions = [
        { value: "", label: "선택" },
        ...(manuFacturerList?.length > 0
            ? manuFacturerList.map((manuFacturerValue: IManufacturer) => {
                  return {
                      value: manuFacturerValue.industryCode,
                      label: manuFacturerValue.industryName,
                  };
              })
            : []),
    ];

    const mainCategoryOptions = [
        { value: "", label: "선택" },
        ...(mainCategoryList?.length > 0
            ? mainCategoryList.map((mainCategoryValue: IMaincategory) => {
                  return {
                      value: mainCategoryValue.group_code,
                      label: mainCategoryValue.group_name,
                  };
              })
            : []),
    ];

    const subCategoryOptions = [
        { value: "", label: "선택" },
        ...(subCategoryList?.length > 0
            ? subCategoryList.map((subCategoryValue: ISubcategory) => {
                  return {
                      value: subCategoryValue.detail_code,
                      label: subCategoryValue.detail_name,
                  };
              })
            : []),
    ];

    const productOptions = [
        { value: "", label: "선택" },
        ...(productList?.length > 0
            ? productList.map((productValue: IProduct) => {
                  console.log(`product_id: ${productValue.product_id} / product_name: ${productValue.name}`);
                  return {
                      value: productValue.product_id,
                      label: productValue.name,
                  };
              })
            : []),
    ];

    const getClientList = () => {
        axios.post("/business/client-list/getClientListBody.do").then((res: AxiosResponse<IGetClientResponse>) => {
            // axios.post("/order-information-list/clientNamesBody.do").then((res: AxiosResponse<IGetClientResponse>) => {
            setClientList(res.data.clientList);
        });
    };

    const getManufacturerList = () => {
        axios
            .post("/business/sales-plan/getmanufacturerBody.do", { key: "val1" })
            .then((res: AxiosResponse<IManufacturerResponse>) => {
                setManuFacturerList(res.data.manuFacturerList);
            });
    };

    const getMainCategoryList = () => {
        axios
            .post("/business/sales-plan/getMainCategoryBody.do", { group_code: selectManuFacturer })
            .then((res: AxiosResponse<IMaincategoryResponse>) => {
                setMainCategoryList(res.data.mainCategory);
            });
    };

    const getSubCategoryList = () => {
        axios
            .post("/business/sales-plan/getSubCategoryListBody.do", { group_code: selectMaincategory })
            .then((res: AxiosResponse<ISubcategoryResponse>) => {
                setSubCategoryList(res.data.subCategory);
            });
    };

    const getProductList = () => {
        axios
            .post("/business/sales-plan/getProductListBody.do", { industry_code: selectSubcategory })
            .then((res: AxiosResponse<IProductResponse>) => {
                setProductList(res.data.productList);
            });
    };

    const insertOrderList = () => {
        const formData = new FormData(formRef.current);
        setOrderList([
            ...orderList,
            {
                productId: 0,
                quantity: quantityRef.current.value,
                supplyPrice: supplyPriceRef.current.value,
                unitPrice: unitPriceRef.current.value,
            },
        ]);
        orderList.forEach((order, index) => {
            console.log(`orderList[${index}]`, order);
        });
    };
    const saveOrderList = () => {
        const formData = new FormData(formRef.current);
        const params: any = {};
        formData.forEach((value, key) => {
            params[key] = value;
        });
        params.orderList = orderList;

        axios
            .post("/business/order-information-list/saveOrderBody.do", { ...params })
            .then((res: AxiosResponse) => {
                if (res.data.result === "success") {
                    console.log("Response:", res);
                    alert("저장되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("서버 오류가 발생했습니다.");
            });
    };

    const deleteOrder = (order: IOrderInfo, index: number) => {
        orderList.splice(orderList.indexOf(order, index));
        setOrderList([...orderList]);
    };

    const deleteAllOrder = () => {};

    const detailOrderList = () => {
        axios
            .post("/businessorder-information-list/orderDetailBody.do", {
                orderId: detailOrder.id,
                clientId: detailOrder.clientId,
            })
            .then((res: AxiosResponse) => {
                console.log(res.data.client);
                console.log(res.data.order);
                console.log(res.data.orderDetail);
            });
    };
    return (
        <OrderListModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        거래처
                        <StyledSelectBox
                            options={clientOptions}
                            value={Number(selectclient)}
                            onChange={setSelectClient}
                            name='clientId'
                        />
                    </label>
                    <label>
                        영업구분
                        <StyledSelectBox
                            options={orderSalesAreaOptions}
                            value={selectOrderSalesArea}
                            onChange={setSelectOrderSalesArea}
                            name='orderSalesArea'
                        />
                    </label>
                    <label>
                        납기날짜
                        <StyledInput type='date' name='orderDeliveryDate' />
                    </label>
                    <label>
                        제조업체
                        <StyledSelectBox
                            options={manuFacturerOptions}
                            value={selectManuFacturer}
                            onChange={setSelectManuFacturer}
                            name='manufacturer_id'
                        />
                    </label>
                    <label>
                        대분류
                        <StyledSelectBox
                            options={mainCategoryOptions}
                            value={selectMaincategory}
                            onChange={setSelectMaincategory}
                            name='industry_code'
                        />
                    </label>
                    <label>
                        소분류
                        <StyledSelectBox
                            options={subCategoryOptions}
                            value={selectSubcategory}
                            onChange={setSelectSubcategory}
                            name='detail_code'
                        />
                    </label>
                    <label>
                        제품
                        {/* <StyledSelectBox
                            options={productOptions}
                            value={selectProduct}
                            onChange={setSelectProduct}
                            name='product_id'
                        /> */}
                        <StyledInput type='text' name='product_id' value={0}></StyledInput>
                    </label>
                    <label>
                        제품단가
                        <StyledInput type='text' name='unitPrice' ref={unitPriceRef}></StyledInput>
                    </label>
                    <label>
                        수량
                        <StyledInput type='text' name='quantity' ref={quantityRef}></StyledInput>
                    </label>
                    <label>
                        공급가액
                        <StyledInput type='text' name='supplyPrice' ref={supplyPriceRef}></StyledInput>
                    </label>
                    <label>
                        <>
                            추가내역
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>제품명</StyledTh>
                                        <StyledTh>제품단가</StyledTh>
                                        <StyledTh>수량</StyledTh>
                                        <StyledTh>공급가액</StyledTh>
                                        <StyledTh>비고</StyledTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderList?.length > 0 ? (
                                        orderList.map((order, index) => {
                                            return (
                                                <tr key={index}>
                                                    <StyledTd>{order.productId}</StyledTd>
                                                    <StyledTd>{order.unitPrice}</StyledTd>
                                                    <StyledTd>{order.quantity}</StyledTd>
                                                    <StyledTd>{order.supplyPrice}</StyledTd>
                                                    <StyledTd>
                                                        <StyledButton onClick={() => deleteOrder(order, index)}>
                                                            추가삭제
                                                        </StyledButton>
                                                    </StyledTd>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <StyledTd colSpan={5}>추가내역이 없습니다.</StyledTd>
                                        </tr>
                                    )}
                                    <tr>
                                        <StyledButton>전체추가삭제</StyledButton>
                                    </tr>
                                </tbody>
                            </StyledTable>
                        </>
                    </label>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={insertOrderList}>
                            추가
                        </StyledButton>
                        <StyledButton type='button' onClick={saveOrderList}>
                            등록
                        </StyledButton>
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                    <input type='hidden' name='estimateId' value={""} readOnly />
                </form>
            </div>
        </OrderListModalStyled>
    );
};
