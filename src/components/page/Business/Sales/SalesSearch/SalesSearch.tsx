import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import {
    IMaincategory,
    IMaincategoryResponse,
    IManufacturer,
    IManufacturerResponse,
    IProduct,
    IProductResponse,
    ISubcategory,
    ISubcategoryResponse,
} from "../../../../../models/interface/ISales";

interface ISalesSearchProps {
    selectManuFacturer: string;
    selectSubcategory: string;
    selectDate: string;
    selectProduct: string;
    setSelectManuFacturer: React.Dispatch<React.SetStateAction<string>>;
    setSelectSubcategory: React.Dispatch<React.SetStateAction<string>>;
    setSelectDate: React.Dispatch<React.SetStateAction<string>>;
    setSelectProduct: React.Dispatch<React.SetStateAction<string>>;
}

export const SalesSearch: FC<ISalesSearchProps> = ({
    selectManuFacturer,
    setSelectManuFacturer,
    selectSubcategory,
    setSelectSubcategory,
    selectDate,
    setSelectDate,
    setSelectProduct,
    selectProduct,
}) => {
    const [manuFacturerList, setManuFacturerList] = useState<IManufacturer[]>([]);
    const [mainCategoryList, setMainCategoryList] = useState<IMaincategory[]>([]);
    const [subCategoryList, setSubCategoryList] = useState<ISubcategory[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);

    const [selectMaincategory, setSelectMaincategory] = useState<string>("");

    // select box의 option에 리스트를 불러올때 발생하는 지연현상 수정 필요
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
                  key: subCategoryValue.detail_code,
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

    return (
        <>
            <label>
                제조업체
                <StyledSelectBox
                    options={manuFacturerOptions}
                    value={selectManuFacturer}
                    defaultValue={selectManuFacturer}
                    onChange={(value: string) => {
                        setSelectManuFacturer(value);
                        setSelectMaincategory("");
                        setSelectSubcategory("");
                        setSelectProduct("");
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
                        setSelectSubcategory("");
                        setSelectProduct("");
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
                        setSelectProduct("");
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
        </>
    );
};
