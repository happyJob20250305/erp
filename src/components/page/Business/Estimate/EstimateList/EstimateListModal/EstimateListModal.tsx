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
    ISales,
    ISalesResponse,
    ISubcategory,
    ISubcategoryResponse,
} from "../../../../../../models/interface/business/sales/ISales";
import { modalState } from "../../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { EstimateListModalStyled, ModalStyledTable } from "./styled";
import { StyledTable, StyledTd, StyledTh } from "../../../../../common/styled/StyledTable";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { IEstimate } from "../EstimateListMain/EstimateListMain";
import { SalesPlanList } from "../../../../../../pages/business/SalesPlanList";
import { PageNavigate } from "../../../../../common/pageNavigation/PageNavigate";

interface IEstimateInfo {
    productId: number;
    productName: string;
    quantity: string;
    supplyPrice: string;
    unitPrice: string;
    majorCategoryId: string;
    manufacturerId: string;
    subCategoryId: string;
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

// interface IPostResponse {
//     result: "success" | "fail";
// }

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

    const [selectEstimateArea, setSelectEstimateArea] = useState<string>("영업");
    const [selectClient, setSelectClient] = useState<string>("");
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

    const [selectSalesPlanTargetDate, setSelectSalesPlanTargetDate] = useState<string>("");
    const [selectEstimateDeliveryDate, setSelectEstimateDeliveryDate] = useState<string>("");
    const [salesPlanList, setSalesPlanList] = useState<ISales[]>([]);
    const [salesPlanDetailList, setSalesPlanDetailList] = useState([]);
    const [salesPlanCnt, setSalesPlanCnt] = useState<number>(0);

    useEffect(() => {
        getClientList();
        getManufacturerList();
        getMainCategoryList();
        getSubCategoryList();
        getProductList();

        estimateId && detailEstimateList();

        return () => {
            setEstimateId(0);
            setClientId(0);
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
                  return {
                      value: productValue.id,
                      label: productValue.name,
                  };
              })
            : []),
    ];

    const getClientList = () => {
        axios.post("/business/client-list/getClientListBody.do", {}).then((res: AxiosResponse<IGetClientResponse>) => {
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
        const isManuFacturerId = (manuFacturerList: IManufacturer): boolean => {
            return manuFacturerList.industryCode === selectManuFacturer;
        };

        const selectManuFacturerId = manuFacturerList.find(isManuFacturerId);

        setEstimateList([
            ...estimateList,
            {
                productId: selectProduct,
                productName: "",
                quantity: quantityRef.current.value,
                supplyPrice: supplyPriceRef.current.value,
                unitPrice: unitPriceRef.current.value,
                manufacturerId: selectManuFacturerId.manufacturer_id.toString(),
                majorCategoryId: selectMaincategory,
                subCategoryId: selectSubcategory,
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
            .post("/business/estimate-list/saveEstimateBody.do", { ...params })
            .then((res: AxiosResponse) => {
                if (res.data.result === "success") {
                    alert("저장되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
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
            .post("/business/estimate-list/estimateDetailBody.do", {
                estimateId: estimateId,
                clientId: clientId,
            })
            .then((res: AxiosResponse) => {
                setInfoClient(res.data.client);
                setInfoEstimate(res.data.estimate);
                setDetailEstimate(res.data.estimateDetail);
            });
    };

    const searchSalesPlanList = (currentPage: number = 1) => {
        currentPage = currentPage || 1;
        // axios
        //     .post("/business/sales-plan/searchPlanListBody.do", {
        //         group_code: selectManuFacturer,
        //         product_code: selectSubcategory,
        //         target_date: selectSalesPlanTargetDate,
        //         product_id: parseInt(selectProduct),
        //         pageSize: 5,
        //         currentPage,
        //     })
        //     .then((res: AxiosResponse<ISalesResponse>) => {
        //         const filteredEstimateList = res.data.estimateList.filter((estimate) => {
        //             return estimate.salesArea.includes(selectOrderSalesArea);
        //         });

        //         console.log(filteredEstimateList);
        //         setEstimateList(filteredEstimateList);
        //         setEstimateCount(filteredEstimateList.length);
        //         setCpage(currentPage);
        //     });
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
                            견적 내용
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>견적날짜</StyledTh>
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
                                <li>하기와 같이 견적내용을 보내드리오니 확인해주시기 바랍니다.</li>
                            </ol>
                        </label>
                        <label>
                            견적 상세 내용
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>제품</StyledTh>
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
                    // <>
                    //     <form ref={formRef}>
                    //         <label>
                    //             거래처
                    //             <StyledSelectBox
                    //                 options={clientOptions}
                    //                 value={selectclient}
                    //                 onChange={setSelectClient}
                    //                 name='clientId'
                    //             />
                    //         </label>
                    //         <label>
                    //             영업구분
                    //             <StyledSelectBox
                    //                 options={estimateAreaOptions}
                    //                 value={selectOrderSalesArea}
                    //                 onChange={setSelectOrderSalesArea}
                    //                 name='estimateSalesArea'
                    //             />
                    //         </label>
                    //         <label>
                    //             납기날짜
                    //             <StyledInput type='date' name='estimateDeliveryDate' />
                    //         </label>
                    //         <label>
                    //             제조업체
                    //             <StyledSelectBox
                    //                 options={manuFacturerOptions}
                    //                 value={selectManuFacturer}
                    //                 onChange={setSelectManuFacturer}
                    //                 name='manufacturer_id'
                    //             />
                    //         </label>
                    //         <label>
                    //             대분류
                    //             <StyledSelectBox
                    //                 options={mainCategoryOptions}
                    //                 value={selectMaincategory}
                    //                 onChange={setSelectMaincategory}
                    //                 name='industry_code'
                    //             />
                    //         </label>
                    //         <label>
                    //             소분류
                    //             <StyledSelectBox
                    //                 options={subCategoryOptions}
                    //                 value={selectSubcategory}
                    //                 onChange={setSelectSubcategory}
                    //                 name='detail_code'
                    //             />
                    //         </label>
                    //         <label>
                    //             제품
                    //             <StyledSelectBox
                    //                 options={productOptions}
                    //                 value={selectProduct}
                    //                 onChange={(value: number) => setSelectProduct(value)}
                    //                 name='product_id'
                    //             />
                    //         </label>
                    //         <label>
                    //             제품단가
                    //             <StyledInput type='text' name='unitPrice' ref={unitPriceRef}></StyledInput>
                    //         </label>
                    //         <label>
                    //             수량
                    //             <StyledInput type='text' name='quantity' ref={quantityRef}></StyledInput>
                    //         </label>
                    //         <label>
                    //             공급가액
                    //             <StyledInput type='text' name='supplyPrice' ref={supplyPriceRef}></StyledInput>
                    //         </label>
                    //         <label>추가내역</label>
                    //         <>
                    //             <StyledTable>
                    //                 <thead>
                    //                     <tr>
                    //                         <StyledTh>제조업체</StyledTh>
                    //                         <StyledTh>대분류</StyledTh>
                    //                         <StyledTh>소분류</StyledTh>
                    //                         <StyledTh>제품</StyledTh>
                    //                         <StyledTh>제품단가</StyledTh>
                    //                         <StyledTh>수량</StyledTh>
                    //                         <StyledTh>공급가액</StyledTh>
                    //                         <StyledTh>비고</StyledTh>
                    //                     </tr>
                    //                 </thead>
                    //                 <tbody>
                    //                     {estimateList?.length > 0 ? (
                    //                         estimateList.map((estimate, index) => {
                    //                             return (
                    //                                 <tr key={index}>
                    //                                     <StyledTd>{estimate?.manufacturerId}</StyledTd>
                    //                                     <StyledTd>{estimate?.majorCategoryId}</StyledTd>
                    //                                     <StyledTd>{estimate?.subCategoryId}</StyledTd>
                    //                                     <StyledTd>{estimate.productId}</StyledTd>
                    //                                     <StyledTd>{estimate.unitPrice}</StyledTd>
                    //                                     <StyledTd>{estimate.quantity}</StyledTd>
                    //                                     <StyledTd>{estimate.supplyPrice}</StyledTd>
                    //                                     <StyledTd>
                    //                                         <StyledButton onClick={() => deleteOrder(estimate, index)}>
                    //                                             추가삭제
                    //                                         </StyledButton>
                    //                                     </StyledTd>
                    //                                 </tr>
                    //                             );
                    //                         })
                    //                     ) : (
                    //                         <tr>
                    //                             <StyledTd colSpan={8}>추가내역이 없습니다.</StyledTd>
                    //                         </tr>
                    //                     )}
                    //                     <tr>
                    //                         <StyledButton type='button' onClick={deleteAllOrder}>
                    //                             전체추가삭제
                    //                         </StyledButton>
                    //                     </tr>
                    //                 </tbody>
                    //             </StyledTable>
                    //         </>

                    //         <div className={"button-container"}>
                    //             <StyledButton type='button' onClick={insertEstimateList}>
                    //                 추가
                    //             </StyledButton>
                    //             <StyledButton type='button' onClick={saveEstimateList}>
                    //                 등록
                    //             </StyledButton>
                    //             <StyledButton
                    //                 type='button'
                    //                 onClick={() => {
                    //                     setModal(!modal), detailEstimateList();
                    //                 }}
                    //             >
                    //                 나가기
                    //             </StyledButton>
                    //         </div>
                    //     </form>
                    // </>
                    <>
                        <form ref={formRef}>
                            <label>
                                <span>영업 계획 제품 조회</span>
                                <table>
                                    <tr>
                                        <th>
                                            <span>
                                                거래처
                                                <StyledSelectBox
                                                    options={clientOptions}
                                                    value={selectClient}
                                                    onChange={setSelectClient}
                                                    name='clientId'
                                                />
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                영업계획목표날짜
                                                <StyledInput
                                                    type='date'
                                                    name='salesPlanTargetDate'
                                                    value={selectSalesPlanTargetDate}
                                                    onChange={(e) => setSelectSalesPlanTargetDate(e.target.value)}
                                                />
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                영업구분
                                                <StyledSelectBox
                                                    options={estimateAreaOptions}
                                                    value={selectEstimateArea}
                                                    onChange={setSelectEstimateArea}
                                                    name='estimateArea'
                                                />
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                견적목표납기날짜
                                                <StyledInput
                                                    type='date'
                                                    name='deliveryDate'
                                                    value={selectEstimateDeliveryDate}
                                                    onChange={(e) => setSelectEstimateDeliveryDate(e.target.value)}
                                                />
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                <StyledButton type='button' onClick={() => searchSalesPlanList(1)}>
                                                    조회
                                                </StyledButton>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                <img
                                                    src='/refresh.png'
                                                    // onClick={resetSearch}
                                                    style={{ width: "25px", height: "25px" }}
                                                />
                                            </span>
                                        </th>
                                    </tr>
                                </table>
                            </label>
                            <label>
                                <span>영업계획 제품 목록</span>{" "}
                            </label>
                            <>
                                <ModalStyledTable>
                                    <thead>
                                        <tr>
                                            <StyledTh>영업계획번호</StyledTh>
                                            <StyledTh>영업계획목표날짜</StyledTh>
                                            <StyledTh>거래처</StyledTh>
                                            <StyledTh>제조업체</StyledTh>
                                            <StyledTh>대분류</StyledTh>
                                            <StyledTh>소분류</StyledTh>
                                            <StyledTh>제품</StyledTh>
                                            <StyledTh>영업계획목표수량</StyledTh>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salesPlanList?.length > 0 ? (
                                            salesPlanList.map((salesPlan) => {
                                                return (
                                                    <tr key={salesPlan?.plan_num}>
                                                        <StyledTd>{salesPlan?.target_date}</StyledTd>
                                                        <StyledTd>{salesPlan?.client_name}</StyledTd>
                                                        <StyledTd>{salesPlan?.}</StyledTd>
                                                        <StyledTd>{salesPlan?.industry_code}</StyledTd>
                                                        <StyledTd>{salesPlan?.industry_code}</StyledTd>
                                                        <StyledTd>{salesPlan?.detail_code}</StyledTd>
                                                        <StyledTd>{salesPlan?.product_id}</StyledTd>
                                                        <StyledTd>{salesPlan?.goal_quanti}</StyledTd>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <StyledTd colSpan={9}>견적 제품 목록이 없습니다.</StyledTd>
                                            </tr>
                                        )}
                                    </tbody>
                                </ModalStyledTable>
                                <p>
                                    <PageNavigate
                                        totalItemsCount={salesPlanCnt}
                                        activePage={cPage}
                                        itemsCountPerPage={5}
                                        onChange={searchSalesPlanList}
                                    />
                                </p>
                            </>

                            <label>
                                <span>영업계획 제품 추가 목록</span>
                            </label>
                            <ModalStyledTable>
                                <thead>
                                    <tr>
                                        <StyledTh>영업계획번호</StyledTh>
                                        <StyledTh>제품</StyledTh>
                                        <StyledTh>제품단가</StyledTh>
                                        <StyledTh>견적수량</StyledTh>
                                        <StyledTh>공급가액</StyledTh>
                                        <StyledTh>비고</StyledTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesDe?.length > 0 ? (
                                        estimateDetailList.map((estimateDetail, index) => {
                                            return (
                                                <tr key={index}>
                                                    <StyledTd>{estimateDetail?.estimateId}</StyledTd>
                                                    <StyledTd>{estimateDetail?.productName}</StyledTd>
                                                    <StyledTd>{estimateDetail?.unitPrice}</StyledTd>
                                                    <StyledTd>{estimateDetail?.quantity}</StyledTd>
                                                    <StyledTd>{estimateDetail?.supplyPrice}</StyledTd>
                                                    <StyledTd>
                                                        <StyledButton
                                                            onClick={() => deleteEstimate(estimateDetail, index)}
                                                        >
                                                            견적제품삭제
                                                        </StyledButton>
                                                    </StyledTd>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <StyledTd colSpan={9}>수주 제품 목록이 없습니다.</StyledTd>
                                        </tr>
                                    )}
                                </tbody>
                            </ModalStyledTable>

                            <div className={"button-container"}>
                                <StyledButton
                                    type='button'
                                    onClick={deleteAllOrder}
                                    style={{
                                        float: "left",
                                    }}
                                >
                                    전체수주제품삭제
                                </StyledButton>
                                <StyledInput
                                    type='text'
                                    value={selectEstimateId}
                                    onChange={(e) => {
                                        setSelectEstimateId(e.target.value);
                                        insertOrderList(parseInt(e.target.value));
                                    }}
                                />
                                <StyledButton type='button' onClick={saveEstimateList}>
                                    등록
                                </StyledButton>
                                <StyledButton
                                    type='button'
                                    onClick={() => {
                                        setModal(!modal), deleteAllOrder();
                                    }}
                                >
                                    나가기
                                </StyledButton>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </EstimateListModalStyled>
    );
};
