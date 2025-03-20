import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
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
import { modalState } from "../../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { EstimateListModalStyled } from "./styled";
import { StyledTable, StyledTd, StyledTh } from "../../../../../common/styled/StyledTable";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { IEstimate } from "../EstimateListMain/EstimateListMain";

interface IEstimateInfo {
    estimateId: number;
    productId: number;
    productName: string;
    quantity: string;
    supplyPrice: string;
    unitPrice: string;
}

export interface IClientEstimate {
    zip: string;
    bizNum: string;
    memo: string;
    bank: string;
    person: string;
    ph: string;
    personPh: string;
    detailAddr: string;
    id: string;
    addr: string;
    clientName: string;
    email: string;
    bankAccount: string;
    custUpdateDate: string;
}

interface IEstimateListModalProps {
    estimateId: number;
    setEstimateId: React.Dispatch<React.SetStateAction<number>>;
    clientId: number;
    setClientId: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

interface IPostResponse {
    result: "success" | "fail";
}

export const EstimateListModal: FC<IEstimateListModalProps> = ({
    estimateId,
    setEstimateId,
    clientId,
    setClientId,
    postSuccess,
}) => {
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
    const [selectProduct, setSelectProduct] = useState<number>();

    const quantityRef = useRef<HTMLInputElement>(null);
    const supplyPriceRef = useRef<HTMLInputElement>(null);
    const unitPriceRef = useRef<HTMLInputElement>(null);

    const [estimateList, setEstimateList] = useState<IEstimateInfo[]>([]);

    const [infoClient, setInfoClient] = useState<IClientEstimate>();
    const [InfoEstimate, setInfoEstimate] = useState<IEstimate>();
    const [detailEstimate, setDetailEstimate] = useState<IEstimateInfo[]>([]);

    useEffect(() => {
        getClientList();
        getManufacturerList();
        getMainCategoryList();
        getSubCategoryList();
        getProductList();

        // orderId && detailOrderList();

        return () => {
            // setOrderId(0);
            // setClientId(0);
        };
    }, [selectManuFacturer, selectMaincategory, selectSubcategory]);

    const estimateAreaOptions = [
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
                  console.log(`product_id: ${productValue.id} / product_name: ${productValue.name}`);
                  return {
                      value: productValue.id,
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

    const insertEstimateList = () => {
        console.log("selectProduct:" + selectProduct);
        setEstimateList([
            ...estimateList,
            {
                estimateId: 0,
                productId: selectProduct,
                productName: "",
                quantity: quantityRef.current.value,
                supplyPrice: supplyPriceRef.current.value,
                unitPrice: unitPriceRef.current.value,
            },
        ]);
    };

    const saveEstimateList = () => {
        const formData = new FormData(formRef.current);
        const params: any = {};
        formData.forEach((value, key) => {
            params[key] = value;
        });
        params.estimateList = estimateList;

        axios
            .post("/business/order-information-list/saveEstimateBody.do", { ...params })
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

    const deleteOrder = (estimate: IEstimateInfo, index: number) => {
        estimateList.splice(estimateList.indexOf(estimate, index));
        setEstimateList([...estimateList]);
    };

    const deleteAllOrder = () => {
        setEstimateList([]);
    };

    const detailEstimateList = () => {
        axios
            .post("/business/order-information-list/estimateDetailBody.do", {
                estimateId: estimateId,
                clientId: clientId,
            })
            .then((res: AxiosResponse) => {
                setInfoClient(res.data.client);
                setInfoEstimate(res.data.estimate);
                setDetailEstimate(res.data.estimateDetail);
            });
    };
    return (
        <EstimateListModalStyled>
            <div className='container'>
                {estimateId ? (
                    <>
                        <label>
                            공급 받는 자
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>사업자번호</StyledTh>
                                        <StyledTh>회사명</StyledTh>
                                        <StyledTh>주소</StyledTh>
                                        <StyledTh>담당자</StyledTh>
                                        <StyledTh>TEL</StyledTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <StyledTd>{infoClient?.bizNum}</StyledTd>
                                        <StyledTd>{infoClient?.clientName}</StyledTd>
                                        <StyledTd>{infoClient?.addr}</StyledTd>
                                        <StyledTd>{infoClient?.person}</StyledTd>
                                        <StyledTd>{infoClient?.personPh}</StyledTd>
                                    </tr>
                                </tbody>
                            </StyledTable>
                        </label>

                        <label>
                            공급 하는 자
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>사업자번호</StyledTh>
                                        <StyledTh>회사명</StyledTh>
                                        <StyledTh>주소</StyledTh>
                                        <StyledTh>담당자</StyledTh>
                                        <StyledTh>TEL</StyledTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <StyledTd>{"01-1234-1567891"}</StyledTd>
                                        <StyledTd>{"ERP HAPPY JOB"}</StyledTd>
                                        <StyledTd>{"서울시 구로구 디지털로 285 에이스트윈타워 1차 401호"}</StyledTd>
                                        <StyledTd>{"김영업"}</StyledTd>
                                        <StyledTd>{"02-857-7819"}</StyledTd>
                                    </tr>
                                </tbody>
                            </StyledTable>
                        </label>
                        <label>
                            수주 내용
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>수주날짜</StyledTh>
                                        <StyledTh>납기날짜</StyledTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <StyledTd>{InfoEstimate?.estimateDate}</StyledTd>
                                        <StyledTd>{InfoEstimate?.deliveryDate}</StyledTd>
                                    </tr>
                                </tbody>
                            </StyledTable>
                            <ol>
                                <li>귀사의 일이 번창하시길 기원합니다.</li>
                                <li>하기와 같이 수주내용을 보내드리오니 확인해주시기 바랍니다.</li>
                            </ol>
                        </label>
                        <label>
                            수주 상세 내용
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>견적서 번호</StyledTh>
                                        <StyledTh>제품이름</StyledTh>
                                        <StyledTh>납품개수</StyledTh>
                                        <StyledTh>제품단가</StyledTh>
                                        <StyledTh>세액</StyledTh>
                                        <StyledTh>총액</StyledTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailEstimate.map((estimate, index) => {
                                        return (
                                            <tr key={index}>
                                                <StyledTd>{estimate?.estimateId}</StyledTd>
                                                <StyledTd>{estimate?.productName}</StyledTd>
                                                <StyledTd>{estimate?.quantity}</StyledTd>
                                                <StyledTd>{estimate?.supplyPrice}</StyledTd>
                                                <StyledTd>{parseInt(estimate?.supplyPrice) * 0.1}</StyledTd>
                                                <StyledTd>
                                                    {parseInt(estimate?.supplyPrice) *
                                                        parseInt(estimate?.quantity) *
                                                        1.1}
                                                </StyledTd>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </StyledTable>
                        </label>
                        {/* <label>
                                    총액 :<div>\{totalAmount}</div>
                                </label> */}
                        <div className={"button-container"}>
                            <StyledButton type='button' onClick={() => setModal(!modal)}>
                                나가기
                            </StyledButton>
                        </div>
                    </>
                ) : (
                    <>
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
                                    options={estimateAreaOptions}
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
                                <StyledSelectBox
                                    options={productOptions}
                                    value={selectProduct}
                                    onChange={(value: number) => setSelectProduct(value)}
                                    name='product_id'
                                />
                                {/* <StyledInput type='text' name='product_id' value={0}></StyledInput> */}
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
                            <label>추가내역</label>
                            <>
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
                                        {estimateList?.length > 0 ? (
                                            estimateList.map((estimate, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <StyledTd>{estimate.productName}</StyledTd>
                                                        <StyledTd>{estimate.unitPrice}</StyledTd>
                                                        <StyledTd>{estimate.quantity}</StyledTd>
                                                        <StyledTd>{estimate.supplyPrice}</StyledTd>
                                                        <StyledTd>
                                                            <StyledButton onClick={() => deleteOrder(estimate, index)}>
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
                                            <StyledButton type='button' onClick={deleteAllOrder}>
                                                전체추가삭제
                                            </StyledButton>
                                        </tr>
                                    </tbody>
                                </StyledTable>
                            </>

                            <div className={"button-container"}>
                                <StyledButton type='button' onClick={insertEstimateList}>
                                    추가
                                </StyledButton>
                                <StyledButton type='button' onClick={saveEstimateList}>
                                    등록
                                </StyledButton>
                                <StyledButton type='button' onClick={() => setModal(!modal)}>
                                    나가기
                                </StyledButton>
                            </div>
                            <input type='hidden' name='estimateId' value={""} readOnly />
                        </form>
                    </>
                )}
            </div>
        </EstimateListModalStyled>
    );
};
