export interface ISales {
    client_id: string;
    client_name: string;
    detail_code: string;
    detail_name: string;
    emp_id: string;
    emp_name: string;
    goal_quanti: number;
    group_name: string;
    group_code: string;
    industry_code: string;
    manufacturer_id: string;
    name: string;
    perform_qut: number;
    plan_memo: string;
    plan_num: string;
    product_name: string;
    product_id: string;
    target_date: string;
}

export interface ISalesResponse {
    searchPlanList: ISales[];
    salesPlanCnt: number;
}

export interface IManufacturer {
    industryCode: string;
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
    id: number;
}

export interface IProductResponse {
    productList: IProduct[];
    productCnt: number;
}
