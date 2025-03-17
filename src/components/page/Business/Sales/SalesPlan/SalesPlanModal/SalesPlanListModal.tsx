import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { ILoginInfo } from "../../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../../stores/userInfo";
import {
    IMaincategory,
    IMaincategoryResponse,
    IManufacturer,
    IManufacturerResponse,
    IProduct,
    IProductResponse,
    ISales,
    ISubcategory,
    ISubcategoryResponse,
} from "../../../../../../models/interface/business/sales/ISales";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { SalesPlanListModalStyle } from "./styled";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { IClient, IClientResponse } from "../../../Client/ClientList/ClientListMain/ClientListMain";

interface ISalesModalProps {
    detailSalesPlan: ISales;
    setDetailSalesPlan: (detailSalesPlan?: ISales) => void;
    // setDetailSalesPlan: React.Dispatch<React.SetStateAction<object>>;
    postSuccess: () => void;
}

const initSalesPlan = {
    client_id: "",
    client_name: "",
    detail_code: "",
    detail_name: "",
    emp_id: "",
    emp_name: "",
    goal_quanti: "",
    group_name: "",
    group_code: "",
    industry_code: "",
    manufacturer_id: "",
    name: "",
    perform_qut: 0,
    plan_memo: "",
    plan_num: "",
    product_name: "",
    product_id: "",
    target_date: "",
};

interface IPostResponse {
    result: "success" | "fail";
}

export const SalesPlanListModal: FC<ISalesModalProps> = ({ detailSalesPlan, setDetailSalesPlan, postSuccess }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    // const [salesPlan, setSalesPlan] = useState<ISales>(initSalesPlan);

    const [clientList, setClientList] = useState<IClient[]>([]);
    const [manuFacturerList, setManuFacturerList] = useState<IManufacturer[]>([]);
    const [mainCategoryList, setMainCategoryList] = useState<IMaincategory[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<ISubcategory[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);

    const [selectclient, setSelectClient] = useState<string>(detailSalesPlan?.client_id.toString() || "");
    const [selectManuFacturer, setSelectManuFacturer] = useState<string>(detailSalesPlan?.industry_code || "");
    const [selectMaincategory, setSelectMaincategory] = useState<string>(detailSalesPlan?.industry_code || "");
    const [selectSubcategory, setSelectSubcategory] = useState<string>(detailSalesPlan?.detail_code || "");
    const [selectProduct, setSelectProduct] = useState<string>(detailSalesPlan?.product_name || "");

    const [planNum, setPlanNum] = useState<string>(detailSalesPlan?.plan_num);
    const [selectDate, setSelectDate] = useState<string>("");

    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);

    useEffect(() => {
        // console.log("detailSalesPlan:" + detailSalesPlan);
        // for (const [key, value] of Object.entries(detailSalesPlan)) {
        //     console.log("Key: " + key + ", Value: " + value);
        // }
        getClientList();
        getManufacturerList();
        getMainCategoryList();
        getSubCategoryList();
        getProductList();
        return () => {
            setDetailSalesPlan(initSalesPlan);
        };
    }, [selectclient, selectManuFacturer, selectMaincategory, selectSubcategory, selectProduct]);

    const clientOptions = [
        { value: "", label: "선택" },
        ...(clientList?.length > 0
            ? clientList.map((clientValue: IClient) => {
                  //   console.log("clientValue.client_id:" + clientValue.client_id);
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
                  //   console.log("manuFacturerList:" + manuFacturerList);
                  //   for (let key in manuFacturerList) {
                  //       console.log(manuFacturerList[key]);
                  //   }
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
                      // key 요소가 활용 되고 있는지 확인 필요
                      //   key: subCategoryValue.detail_code,
                      value: subCategoryValue.detail_code,
                      label: subCategoryValue.detail_name,
                  };
              })
            : []),
    ];

    // const productIdx = new Array(productList.length).toString;

    const productOptions = [
        { value: "", label: "선택" },
        ...(productList?.length > 0
            ? productList.map((productValue: IProduct) => {
                  return {
                      // 오류 발생
                      // Warning: Encountered two children with the same key, `MF00102`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version. Error Component Stack
                      // select box에 새로운 리스트를 반영할 떄 기존 리스트가 사라지고 새로운 리스트가 담겨야 하는데 유일한 키값이 중복되어
                      // 고유값 활용을 위한 mapper 영역 수정이 필요한지 확인 필요

                      // key 요소가 활용 되고 있는지 확인 필요
                      //   key: productIdx,
                      value: productValue.product_id,
                      label: productValue.name,
                  };
              })
            : []),
    ];

    const getClientList = () => {
        axios.post("/business/client-list/getClientListBody.do").then((res: AxiosResponse<IClientResponse>) => {
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

    const insertSalesPlan = () => {
        // console.log("formRef.current:" + formRef.current);
        const formData = new FormData(formRef.current);
        // const selectManuFacturerId = () => {
        //     return () => {
        //         manuFacturerList["industry_code"];
        //     };
        // };
        // console.log("formData:" + formData);

        const isManuFacturerId = (manuFacturerList: IManufacturer): boolean => {
            return manuFacturerList.industryCode === formData.get("industry_code");
        };

        const selectManuFacturerId = manuFacturerList.find(isManuFacturerId);

        const isProductName = (productList: IProduct): boolean => {
            return productList.name === formData.get("product_id");
        };

        const selectProductName = productList.find(isProductName);

        formData.set("manufacturer_id", selectManuFacturerId.manufacturer_id.toString());
        formData.append("product_name", selectProductName.name);

        axios
            .post("/business/sales-plan/insertPlanBody.do", formData, {
                headers: { "Content-Type": "application/json" },
            })
            // .post("/business/sales-plan/insertPlanBody.do", {
            //     emp_id: "3",
            //     client_id: "0",
            //     manufacturer_id: "0",
            //     industry_code: "MF001",
            //     target_date: "2025-03-16",
            //     goal_quanti: "10",
            //     perform_qut: "0",
            //     plan_memo: "250316_1",
            //     detail_code: "MF00102",
            //     product_name: "레고 캐슬",
            //     plan_num: "",
            // }
            .then((res: AxiosResponse<IPostResponse>) => {
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

    const updateSalesPlan = () => {
        const formData = new FormData(formRef.current);

        const isManuFacturerId = (manuFacturerList: IManufacturer): boolean => {
            return manuFacturerList.industryCode === formData.get("industry_code");
        };

        const selectManuFacturerId = manuFacturerList.find(isManuFacturerId);

        const isProductName = (productList: IProduct): boolean => {
            return productList.name === formData.get("product_id");
        };

        const selectProductName = productList.find(isProductName);

        formData.set("manufacturer_id", selectManuFacturerId.manufacturer_id.toString());
        formData.set("product_name", selectProductName.name);
        axios
            .post("/business/sales-plan/updatePlanBody.do", formData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    console.log("Response:", res);
                    alert("수정되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("서버 오류가 발생했습니다.");
            });
    };

    const deleteSalesPlan = () => {
        axios
            .post("/business/sales-plan/deletePlanBody.do", { plan_num: planNum })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    console.log("Response:", res);
                    alert("삭제되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("서버 오류가 발생했습니다.");
            });
    };
    return (
        <SalesPlanListModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        직원아이디
                        <StyledInput
                            type='text'
                            value={detailSalesPlan?.emp_id || userInfo.empId}
                            name='emp_id'
                            readOnly
                        ></StyledInput>
                    </label>
                    <label>
                        직원이름
                        {/* <StyledInput type='text' defaultValue={userInfo.userNm} name='emp_name'></StyledInput> */}
                        <StyledInput
                            type='text'
                            defaultValue={detailSalesPlan?.emp_name || userInfo.userNm}
                            name='emp_name'
                            readOnly
                        ></StyledInput>
                    </label>
                    <label>
                        거래처
                        <StyledSelectBox
                            options={clientOptions}
                            value={selectclient}
                            onChange={setSelectClient}
                            name='client_id'
                        />
                        {/* <StyledInput
                            type='text'
                            value={detailSalesPlan?.client_name}
                            name='client_name'
                            readOnly
                        ></StyledInput> */}
                    </label>
                    <label>
                        제조업체
                        <StyledSelectBox
                            options={manuFacturerOptions}
                            value={selectManuFacturer}
                            onChange={setSelectManuFacturer}
                            name='manufacturer_id'
                        />
                        {/* <StyledInput
                            type='text'
                            defaultValue={detailSalesPlan.manufacturer_id}
                            name='manufacturer_id'
                        /> */}
                    </label>
                    <label>
                        대분류
                        <StyledSelectBox
                            options={mainCategoryOptions}
                            value={selectMaincategory}
                            onChange={setSelectMaincategory}
                            name='industry_code'
                        />
                        {/* <StyledInput type='text' defaultValue={detailSalesPlan.industry_code} name='industry_code' /> */}
                    </label>
                    <label>
                        소분류
                        <StyledSelectBox
                            options={subCategoryOptions}
                            value={selectSubcategory}
                            onChange={setSelectSubcategory}
                            name='detail_code'
                        />
                        {/* <StyledInput type='text' defaultValue={detailSalesPlan.detail_code} name='detail_code' /> */}
                    </label>
                    <label>
                        제품
                        <StyledSelectBox
                            options={productOptions}
                            value={selectProduct}
                            onChange={setSelectProduct}
                            name='product_id'
                        />
                        {/* <StyledInput type='text' defaultValue={detailSalesPlan.detail_name} name='product_name' /> */}
                    </label>
                    <label>
                        목표날짜
                        <StyledInput
                            type='date'
                            defaultValue={detailSalesPlan?.target_date}
                            onChange={(e) => setSelectDate(e.target.value)}
                            name='target_date'
                        />
                    </label>
                    <label>
                        목표수량
                        <StyledInput
                            type='text'
                            defaultValue={detailSalesPlan?.goal_quanti}
                            name='goal_quanti'
                        ></StyledInput>
                    </label>
                    <label>
                        비고
                        <StyledInput
                            type='text'
                            defaultValue={detailSalesPlan?.plan_memo}
                            name='plan_memo'
                        ></StyledInput>
                    </label>
                    <div className={"button-container"}>
                        {planNum ? (
                            <>
                                <StyledButton type='button' onClick={updateSalesPlan}>
                                    수정
                                </StyledButton>
                                <StyledButton type='button' onClick={deleteSalesPlan}>
                                    삭제
                                </StyledButton>
                            </>
                        ) : (
                            <>
                                <StyledButton type='button' onClick={insertSalesPlan}>
                                    등록
                                </StyledButton>
                            </>
                        )}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                    <input type='hidden' name='plan_num' value={planNum} readOnly />
                    <input type='hidden' name='perform_qut' value={detailSalesPlan?.perform_qut} readOnly />
                </form>
            </div>
        </SalesPlanListModalStyle>
    );
};
