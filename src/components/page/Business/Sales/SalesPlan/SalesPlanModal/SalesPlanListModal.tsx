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
    ISalesPlan,
    ISubcategory,
    ISubcategoryResponse,
} from "../../../../../../models/interface/personnel/Sales/ISales";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { SalesSearch } from "../SalesPlanSearch/SalesSearch";
import { SalesPlanListSearchStyled } from "../SalesPlanSearch/styled";

interface ISalesModalProps {
    planNum?: ISalesPlan;
    // setPlanNum: (planNum?: ISalesPlan) => void;
    setPlanNum: React.Dispatch<React.SetStateAction<ISalesPlan>>;
    postSucces: () => void;
}

const initSalesPlan = {
    client_id: 0,
    client_name: "",
    detail_code: "",
    detail_name: "",
    emp_id: 0,
    emp_name: "",
    goal_quanti: 0,
    group_name: "",
    industry_code: "",
    manufacturer_id: 0,
    name: "",
    perform_qut: 0,
    plan_memo: "",
    plan_num: 0,
    product_name: "",
    target_date: "",
};

interface IPostResponse {
    result: "success" | "fail";
}
export const SalesPlanListModal: FC<ISalesModalProps> = ({ planNum, setPlanNum, postSucces }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [salesPlan, setSalesPlan] = useState<ISalesPlan>(initSalesPlan);

    const [manuFacturerList, setManuFacturerList] = useState<IManufacturer[]>([]);
    const [mainCategoryList, setMainCategoryList] = useState<IMaincategory[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<ISubcategory[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);

    const [selectManuFacturer, setSelectManuFacturer] = useState<string>(planNum?.name || "");
    const [selectMaincategory, setSelectMaincategory] = useState<string>("");
    const [selectSubcategory, setSelectSubcategory] = useState<string>("");
    const [selectProduct, setSelectProduct] = useState<string>("");

    const [selectDate, setSelectDate] = useState<string>("");

    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);

    useEffect(() => {
        getManufacturerList();
        getMainCategoryList();
        getSubCategoryList();
        getProductList();
    }, [selectManuFacturer, selectMaincategory, selectSubcategory, selectProduct]);

    const manuFacturerOptions = [
        { value: "", label: "선택" },
        ...(manuFacturerList?.length > 0
            ? manuFacturerList.map((manuFacturerValue: IManufacturer) => ({
                  value: manuFacturerValue.industryCode,
                  label: manuFacturerValue.industryName,
              }))
            : []),
    ];

    const mainCategoryOptions = [
        { value: "", label: "선택" },
        ...(mainCategoryList?.length > 0
            ? mainCategoryList.map((mainCategoryValue: IMaincategory) => ({
                  value: mainCategoryValue.group_code,
                  label: mainCategoryValue.group_name,
              }))
            : []),
    ];

    const subCategoryOptions = [
        { value: "", label: "선택" },
        ...(subCategoryList?.length > 0
            ? subCategoryList.map((subCategoryValue: ISubcategory) => ({
                  // key 요소가 활용 되고 있는지 확인 필요
                  //   key: subCategoryValue.detail_code,
                  value: subCategoryValue.detail_code,
                  label: subCategoryValue.detail_name,
              }))
            : []),
    ];

    const productIdx = new Array(productList.length).toString;

    const productOptions = [
        { value: "", label: "선택" },
        ...(productList?.length > 0
            ? productList.map((productValue: IProduct) => ({
                  // 오류 발생
                  // Warning: Encountered two children with the same key, `MF00102`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version. Error Component Stack
                  // select box에 새로운 리스트를 반영할 떄 기존 리스트가 사라지고 새로운 리스트가 담겨야 하는데 유일한 키값이 중복되어
                  // 고유값 활용을 위한 mapper 영역 수정이 필요한지 확인 필요

                  // key 요소가 활용 되고 있는지 확인 필요
                  key: productIdx,
                  value: productValue.name,
                  label: productValue.name,
              }))
            : []),
    ];

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

    const insertSales = () => {
        axios
            .post("/business/sales-plan/insertPlanBody.do", formRef.current, {
                headers: {
                    "Content-Type": `application/json`,
                },
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("저장되었습니다.");
                    // postSuccess();
                }
            });
    };

    return (
        <SalesPlanListSearchStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        직원아이디
                        <StyledInput
                            type='text'
                            defaultValue={planNum?.emp_id || userInfo.empId}
                            name='emp_id'
                        ></StyledInput>
                    </label>
                    <label>
                        직원이름
                        <StyledInput
                            type='text'
                            defaultValue={planNum?.emp_name || userInfo.userNm}
                            name='emp_name'
                        ></StyledInput>
                    </label>
                    <label>
                        거래처
                        <StyledInput type='text' name='client_id'></StyledInput>
                    </label>
                    <label>
                        제조업체
                        {/* <StyledSelectBox
                            options={manuFacturerOptions}
                            value={selectManuFacturer}
                            onChange={(value: string) => {
                                setSelectManuFacturer(value);
                                setSelectMaincategory("");
                                setSelectSubcategory("");
                                setSelectProduct("");
                            }}
                            name='manufacturer_id'
                        /> */}
                        <StyledInput type='text' name='manufacturer_id' />
                    </label>
                    <label>
                        대분류
                        {/* <StyledSelectBox
                            options={mainCategoryOptions}
                            value={selectMaincategory}
                            onChange={(value: string) => {
                                setSelectMaincategory(value);
                                setSelectSubcategory("");
                                setSelectProduct("");
                            }}
                            name='industry_code'
                        /> */}
                        <StyledInput type='text' name='industry_code' />
                    </label>
                    <label>
                        소분류
                        {/* <StyledSelectBox
                            options={subCategoryOptions}
                            value={selectSubcategory}
                            onChange={(value: string) => {
                                setSelectSubcategory(value);
                                setSelectProduct("");
                            }}
                            name='detail_code'
                        /> */}
                        <StyledInput type='text' name='detail_code' />
                    </label>
                    <label>
                        제품
                        {/* <StyledSelectBox
                            options={productOptions}
                            value={selectProduct}
                            onChange={(value: string) => setSelectProduct(value)}
                            name='product_name'                            
                        /> */}
                        <StyledInput type='text' name='product_name' />
                    </label>
                    <label>
                        목표날짜
                        <StyledInput type='date' name='target_date' onChange={(e) => setSelectDate(e.target.value)} />
                    </label>
                    <label>
                        목표수량
                        <StyledInput type='text' name='goal_quanti'></StyledInput>
                    </label>
                    <label>
                        비고
                        <StyledInput type='text' name='plan_memo'></StyledInput>
                    </label>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={insertSales}>
                            등록
                        </StyledButton>
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>

                    <input type='hidden' name='plan_num' value='' />
                </form>
            </div>
        </SalesPlanListSearchStyled>
    );
};
