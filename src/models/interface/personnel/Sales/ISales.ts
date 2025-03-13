export interface ISales {
    client_id: number;
    client_name: string;
    detail_code: string;
    detail_name: string;
    emp_id: number;
    emp_name: string;
    goal_quanti: number;
    group_name: string;
    industry_code: string;
    manufacturer_id: number;
    name: string;
    perform_qut: number;
    plan_memo: string;
    plan_num: number;
    product_name: string;
    target_date: string;
}

export interface ISalesResponse {
    searchPlanList: ISales[];
    salesCnt: number;
}

export interface IManufacturer {
    industryCode?: string;
    industryName: string;
    manufacturer_id: number;
}

export interface IManufacturerResponse {
    manuFacturerList: IManufacturer[];
    unitIndustrycode: string;
    manufacturerCnt: number;
}

export interface IMaincategory {
    group_code: string;
    group_name: string;
}

export interface IMaincategoryResponse {
    mainCategory: IMaincategory[];
    mainCategoryCnt: number;
}

export interface ISubcategory {
    detail_code: string;
    detail_name: string;
}

export interface ISubcategoryResponse {
    subCategory: ISubcategory[];
    subcategoryCnt: number;
}

export interface IProduct {
    industry_code: string;
    name: string;
    product_code: string;
}

export interface IProductResponse {
    productList: IProduct[];
    productCnt: number;
}
