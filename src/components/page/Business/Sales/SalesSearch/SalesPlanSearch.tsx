import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { SalesPlanSearchStyled } from "./styled";
import { SalesPlanContext } from "../../../../../api/Provider/SalesPlanProvider";
import { Navigate, useNavigate } from "react-router-dom";

interface IManufacturer {
    industryCode: string;
    industryName: string;
    manufacturer_id: number;
}

interface IManufacturerResponse {
    manuFacturerList: IManufacturer[];
    unitIndustrycode: string;
    manufacturerCnt: number;
}

export const SalesPlanSearch = () => {
    const manuFacturer = useRef<HTMLInputElement>();
    const mainCategory = useRef<HTMLInputElement>();
    const subCategory = useRef<HTMLInputElement>();
    const product = useRef<HTMLInputElement>();
    const targetDate = useRef<HTMLInputElement>();
    const { setSearchKeyword } = useContext(SalesPlanContext);

    const [manuFacturerList, setManuFacturerList] = useState<IManufacturer[]>([]);
    const [selectManuFacturer, setSelectManuFacturer] = useState<string>("전체");
    const [groupCode, setGroupCode] = useState<string>();

    const manuFacturerOptions =
        manuFacturerList?.length > 0
            ? manuFacturerList.map((manuFacturerValue: IManufacturer) => {
                  //   console.log("manuFacturerValue.industryCode:" + manuFacturerValue.industryCode);
                  //   console.log("manuFacturerValue.industryName:" + manuFacturerValue.industryName);
                  //   console.log("manuFacturerValue.manufacturer_id:" + manuFacturerValue.manufacturer_id);

                  return {
                      value: manuFacturerValue.industryCode,
                      label: manuFacturerValue.industryName,
                  };
              })
            : [];

    useEffect(() => {
        getManufacturerList();
        // getMainCategoryList();
        // getSubCategoryList();
        // getProductList();
    }, []);

    // /리스트만 가져와서 값을 활용, useRef를 활용하여 재랜더링 방지와 값을 저장하여 사용?
    const getManufacturerList = () => {
        axios
            .post("/business/sales-plan/getmanufacturerBody.do", { key: "val1" })
            .then((res: AxiosResponse<IManufacturerResponse>) => {
                // console.log("res.data.unitIndustrycode:" + res.data.unitIndustrycode);
                // console.log("res.data.manufacturerList:" + res.data.manuFacturerList);
                setManuFacturerList(res.data.manuFacturerList);
            });
    };

    const getMainCategoryList = () => {
        axios
            .post("/business/sales-plan/getMainCategoryBody.do", { group_code: groupCode })
            .then((res: AxiosResponse) => {
                console.log(res.data.mainCategory);
            });
    };

    const getSubCategoryList = () => {
        axios
            .post("/business/sales-plan/getSubCategoryListBody.do", { group_code: "MF001" })
            .then((res: AxiosResponse) => {
                console.log(res.data.subCategory);
            });
    };

    const getProductList = () => {
        axios
            .post("/business/sales-plan/getProductListBody.do", { industry_code: "MF00102" })
            .then((res: AxiosResponse) => {
                // console.log(res.data.productList);
            });
    };

    const handlerSearch = () => {
        // console.log("manuFacturer.current.value:" + manuFacturer.current.value);
        // console.log("mainCategory.current.value:" + mainCategory.current.value);
        // console.log("subCategory.current.value:" + subCategory.current.value);
        // console.log("product.current.value:" + product.current.value);
        // console.log("targetDate.current.value:" + targetDate.current.value);
        setSearchKeyword({
            // // as-is 개발자도구-페이로드 결과 값들들
            group_code: "MF001",
            product_code: "MF00102",
            target_date: "2025-02-20",
            product_name: "뽀로로 병원놀이",
            enterence: "",
            // group_code: mainCategory.current.value,
            // product_code: subCategory.current.value,
            // target_date: targetDate.current.value,
            // product_name: product.current.value,
            // 조건 분기로 앞선 변수가 채워져 있을 때와 비워져 있을 때를 다르게 실행 처리 필요
            // enterence: "",
        });
    };

    return (
        <SalesPlanSearchStyled>
            {/* <span>
                {"산업군"}
                <StyledInput ref={manuFacturer} />
            </span> */}
            <span>
                {"산업군"}
                <StyledSelectBox
                    options={manuFacturerOptions}
                    value={selectManuFacturer}
                    onChange={(value: string) => setSelectManuFacturer(value)}
                />
            </span>
            <span>
                {"대분류"}
                <StyledInput ref={mainCategory} />
            </span>
            <span>
                {"소분류"}
                <StyledInput ref={subCategory} />
            </span>
            <span>
                {"제품"}
                <StyledInput ref={product} />
            </span>
            <span>
                {"날짜"}
                <StyledInput type='date' ref={targetDate} />
            </span>
            <StyledButton onClick={handlerSearch}>조회</StyledButton>
        </SalesPlanSearchStyled>
    );
};
