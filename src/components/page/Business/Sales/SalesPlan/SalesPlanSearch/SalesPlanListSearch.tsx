import { useContext, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
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
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { SalesPlanListSearchStyled } from "./styled";
import { SalesPlanListContext } from "../../../../../../api/Provider/SalesPlanProvider";

export const SalesPlanListSearch = () => {
    const [manuFacturerList, setManuFacturerList] = useState<IManufacturer[]>([]);
    const [mainCategoryList, setMainCategoryList] = useState<IMaincategory[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<ISubcategory[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);

    const [selectManuFacturer, setSelectManuFacturer] = useState<string>("");
    const [selectMaincategory, setSelectMaincategory] = useState<string>("");
    const [selectSubcategory, setSelectSubcategory] = useState<string>("");
    const [selectProduct, setSelectProduct] = useState<string>("");

    const [selectDate, setSelectDate] = useState<string>("");

    const { setSearchKeyword } = useContext(SalesPlanListContext);

    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
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

    const handlerSearch = () => {
        setSearchKeyword({
            group_code: selectManuFacturer,
            product_code: selectSubcategory,
            target_date: selectDate,
            product_id: parseInt(selectProduct),
        });
    };

    return (
        <SalesPlanListSearchStyled>
            <label>
                제조업체
                <StyledSelectBox
                    options={manuFacturerOptions}
                    value={selectManuFacturer}
                    onChange={(value: string) => {
                        setSelectManuFacturer(value);
                    }}
                />
            </label>
            <label>
                대분류
                <StyledSelectBox
                    options={mainCategoryOptions}
                    value={selectMaincategory}
                    onChange={(value: string) => {
                        setSelectMaincategory(value);
                    }}
                />
            </label>
            <label>
                소분류
                <StyledSelectBox
                    options={subCategoryOptions}
                    value={selectSubcategory}
                    onChange={(value: string) => {
                        setSelectSubcategory(value);
                    }}
                />
            </label>
            <label>
                제품
                <StyledSelectBox
                    options={productOptions}
                    value={selectProduct}
                    onChange={(value: string) => setSelectProduct(value)}
                />
            </label>
            <label>
                날짜
                <StyledInput type='date' onChange={(e) => setSelectDate(e.target.value)} />
            </label>
            <StyledButton onClick={handlerSearch}>조회</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </SalesPlanListSearchStyled>
    );
};
