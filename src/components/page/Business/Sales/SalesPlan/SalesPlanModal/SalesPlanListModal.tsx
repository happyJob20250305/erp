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
import { SalesPlanListModalStyled } from "./styled";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { IClient, IClientResponse } from "../../../Client/ClientList/ClientListMain/ClientListMain";

interface ISalesModalProps {
    detailSalesPlan: ISales;
    // setDetailSalesPlan: (detailSalesPlan?: ISales) => void;
    setDetailSalesPlan: React.Dispatch<React.SetStateAction<ISales>>;
    postSuccess: () => void;
}

const initSales = {
    client_id: "",
    client_name: "",
    detail_code: "",
    detail_name: "",
    emp_id: "",
    emp_name: "",
    goal_quanti: null,
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

    const [clientList, setClientList] = useState<IClient[]>([]);
    const [manuFacturerList, setManuFacturerList] = useState<IManufacturer[]>([]);
    const [mainCategoryList, setMainCategoryList] = useState<IMaincategory[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<ISubcategory[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);

    const [selectclient, setSelectClient] = useState<string>(detailSalesPlan?.client_id.toString() || "");
    const [selectManuFacturer, setSelectManuFacturer] = useState<string>(detailSalesPlan?.industry_code || "");
    const [selectMaincategory, setSelectMaincategory] = useState<string>(detailSalesPlan?.industry_code || "");
    const [selectSubcategory, setSelectSubcategory] = useState<string>(detailSalesPlan?.detail_code || "");
    const [selectProduct, setSelectProduct] = useState<number>(parseInt(detailSalesPlan?.product_id) || 0);

    const [planNum, setPlanNum] = useState<string>(detailSalesPlan?.plan_num || "");
    const [selectDate, setSelectDate] = useState<string>(detailSalesPlan?.target_date || "");

    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);

    useEffect(() => {
        return () => {
            setDetailSalesPlan(initSales);
            setPlanNum("");
        };
    }, []);

    useEffect(() => {
        getClientList();
        getManufacturerList();
    }, []);

    useEffect(() => {
        getMainCategoryList();
    }, [selectManuFacturer]);

    useEffect(() => {
        getSubCategoryList();
    }, [selectMaincategory]);

    useEffect(() => {
        getProductList();
    }, [selectSubcategory]);

    const clientOptions = [
        { value: "", label: "선택" },
        ...(clientList?.length > 0
            ? clientList.map((clientValue: IClient) => {
                  return {
                      value: clientValue.id,
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
        const formData = new FormData(formRef.current);

        //
        const isManuFacturerId = (manuFacturerList: IManufacturer): boolean => {
            return manuFacturerList.industryCode === formData.get("industry_code");
        };

        const selectManuFacturerId = manuFacturerList.find(isManuFacturerId);

        //
        const isProductName = (productList: IProduct): boolean => {
            return productList.id.toString() === formData.get("product_id");
        };

        const selectProductName = productList.find(isProductName);

        //
        formData.set("manufacturer_id", selectManuFacturerId.manufacturer_id.toString());

        //
        formData.append("emp_id", (detailSalesPlan?.emp_id || userInfo.empId).toString());
        formData.append("product_name", selectProductName.name);
        formData.append("perform_qut", (0).toString());

        axios
            .post("/business/sales-plan/insertPlanBody.do", formData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("저장되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                alert("서버 오류가 발생했습니다.");
            });
    };

    const updateSalesPlan = () => {
        const formData = new FormData(formRef.current);

        //
        const isManuFacturerId = (manuFacturerList: IManufacturer): boolean => {
            return manuFacturerList.industryCode === formData.get("industry_code");
        };

        const selectManuFacturerId = manuFacturerList.find(isManuFacturerId);

        //
        const isProductName = (productList: IProduct): boolean => {
            return productList.id.toString() === formData.get("product_id");
        };
        const selectProductName = productList.find(isProductName);

        //

        formData.set("manufacturer_id", selectManuFacturerId.manufacturer_id.toString());
        formData.set("product_name", selectProductName.name);

        //
        formData.append("emp_id", (detailSalesPlan?.emp_id || userInfo.empId).toString());
        formData.append("plan_num", planNum);
        formData.append("perform_qut", (detailSalesPlan?.perform_qut || 0).toString());
        axios
            .post("/business/sales-plan/updatePlanBody.do", formData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("수정되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                alert("서버 오류가 발생했습니다.");
            });
    };

    const deleteSalesPlan = () => {
        axios
            .post("/business/sales-plan/deletePlanBody.do", { plan_num: planNum })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("삭제되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                alert("서버 오류가 발생했습니다.");
            });
    };
    return (
        <SalesPlanListModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        <span>
                            직원아이디<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledInput type='text' value={userInfo.loginId || ""} readOnly></StyledInput>
                    </label>
                    <label>
                        <span>
                            직원이름<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledInput
                            type='text'
                            defaultValue={userInfo.userNm || ""}
                            name='emp_name'
                            readOnly
                        ></StyledInput>
                    </label>
                    <label>
                        <span>
                            거래처<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledSelectBox
                            options={clientOptions}
                            value={selectclient}
                            onChange={setSelectClient}
                            name='client_id'
                        />
                    </label>
                    <label>
                        <span>
                            제조업체<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledSelectBox
                            options={manuFacturerOptions}
                            value={selectManuFacturer}
                            onChange={setSelectManuFacturer}
                            name='manufacturer_id'
                        />
                    </label>
                    <label>
                        <span>
                            대분류<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledSelectBox
                            options={mainCategoryOptions}
                            value={selectMaincategory}
                            onChange={setSelectMaincategory}
                            name='industry_code'
                        />
                    </label>
                    <label>
                        <span>
                            소분류<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledSelectBox
                            options={subCategoryOptions}
                            value={selectSubcategory}
                            onChange={setSelectSubcategory}
                            name='detail_code'
                        />
                    </label>
                    <label>
                        <span>
                            제품<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledSelectBox
                            options={productOptions}
                            value={selectProduct}
                            onChange={setSelectProduct}
                            name='product_id'
                        />
                    </label>
                    <label>
                        <span>
                            목표날짜<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledInput
                            type='date'
                            defaultValue={selectDate}
                            onChange={(e) => setSelectDate(e.target.value)}
                            name='target_date'
                        />
                    </label>
                    <label>
                        <span>
                            목표수량<span style={{ color: "red" }}>*</span>
                        </span>
                        <StyledInput
                            type='text'
                            defaultValue={detailSalesPlan?.goal_quanti}
                            name='goal_quanti'
                        ></StyledInput>
                    </label>
                    <label>
                        <span>비고</span>
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
                </form>
            </div>
        </SalesPlanListModalStyled>
    );
};
