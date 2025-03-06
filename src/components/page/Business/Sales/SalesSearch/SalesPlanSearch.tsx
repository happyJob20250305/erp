import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { SalesPlanSearchStyled } from "./styled";
import { SalesPlanContext } from "../../../../../api/Provider/SalesPlanProvider";

export const SalesPlanSearch = () => {
    const manuFacturer = useRef<HTMLInputElement>();
    const mainCategory = useRef<HTMLInputElement>();
    const subCategory = useRef<HTMLInputElement>();
    const product = useRef<HTMLInputElement>();

    const [manuFacturerList, setManuFacturerList] = useState([]);
    // const[]
    const { setSearchKeyword } = useContext(SalesPlanContext);

    // useEffect(() => {
    //     // getManufacturerList();
    //     // getMainCategoryList();
    //     // getSubCategoryList();
    //     // getProductList();
    // });

    const getManufacturerList = () => {
        axios.post("/business/sales-plan/getmanufacturerBody.do", { key: "val1" }).then((res: AxiosResponse) => {
            // console.log(res.data.manuFacturerList);
            console.log(res.data.unitIndustrycode);
            setManuFacturerList(res.data.manuFacturerList);
        });
    };

    const getMainCategoryList = () => {
        axios
            .post("/business/sales-plan/getMainCategoryBody.do", { group_code: "MF001" })
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
        console.log(
            manuFacturer.current.value,
            mainCategory.current.value,
            subCategory.current.value,
            product.current.value
        );
        setSearchKeyword({
            manuFacturer: manuFacturer.current.value,
            mainCategory: mainCategory.current.value,
            subCategory: subCategory.current.value,
            product: product.current.value,
        });
    };

    return (
        <SalesPlanSearchStyled>
            <span>
                {"산업군"}
                <StyledInput ref={manuFacturer} />
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
            <StyledButton onClick={handlerSearch}>조회</StyledButton>
        </SalesPlanSearchStyled>
    );
};
