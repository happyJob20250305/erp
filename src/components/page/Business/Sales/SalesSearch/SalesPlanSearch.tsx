import { useContext, useEffect, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { SalesPlanSearchStyled } from "./styled";
import { SalesPlanContext } from "../../../../../api/Provider/SalesPlanProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { SalesSearch } from "./SalesSearch";

interface IManufacturer {
    industryCode?: string;
    industryName: string;
    manufacturer_id: number;
}

interface IManufacturerResponse {
    manuFacturerList: IManufacturer[];
    unitIndustrycode: string;
    manufacturerCnt: number;
}

interface IMaincategory {
    group_code: string;
    group_name: string;
}

interface IMaincategoryResponse {
    mainCategory: IMaincategory[];
    mainCategoryCnt: number;
}

interface ISubcategory {
    detail_code: string;
    detail_name: string;
}

interface ISubcategoryResponse {
    subCategory: ISubcategory[];
    subcategoryCnt: number;
}

interface IProduct {
    industry_code: string;
    name: string;
    product_code: string;
}

interface IProductResponse {
    productList: IProduct[];
    productCnt: number;
}

export const SalesPlanSearch = () => {
    const { setSearchKeyword } = useContext(SalesPlanContext);

    const [selectManuFacturer, setSelectManuFacturer] = useState<string>("");
    const [selectSubcategory, setSelectSubcategory] = useState<string>("");
    const [selectProduct, setSelectProduct] = useState<string>("");
    const [selectDate, setSelectDate] = useState<string>("");

    const [modal, setModal] = useRecoilState<boolean>(modalState);

    // // select box의 option에 리스트를 불러올때 발생하는 지연현상 수정 필요
    // // 의존성 배열 분기 처리 필요
    useEffect(() => {
        handlerSearch();
    }, []);

    const handlerSearch = () => {
        setSearchKeyword({
            // as-is 개발자도구-페이로드 결과 값들
            group_code: selectManuFacturer,
            product_code: selectSubcategory,
            target_date: selectDate,
            product_name: selectProduct,
            // 조건 분기로 앞선 변수가 채워져 있을 때와 비워져 있을 때를 다르게 실행 처리 필요
            enterence: "",
        });
    };

    return (
        <SalesPlanSearchStyled>
            <SalesSearch
                setSelectManuFacturer={setSelectManuFacturer}
                selectManuFacturer={selectManuFacturer}
                setSelectSubcategory={setSelectSubcategory}
                selectSubcategory={selectSubcategory}
                setSelectDate={setSelectDate}
                selectDate={selectDate}
                setSelectProduct={setSelectProduct}
                selectProduct={selectProduct}
            />
            <StyledButton onClick={handlerSearch}>조회</StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </SalesPlanSearchStyled>
    );
};
