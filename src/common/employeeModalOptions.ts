import { useState } from "react";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../models/interface/personnel/salary/IOptionList";
import { setSelectOption } from "./setSelectOption";
import { postApiNoPram } from "../api/PersonnelApi/postApi";
import { Employee, SalaryOptionList } from "../api/api";
import { IJobRoleResponse } from "../models/interface/personnel/employee/IEmployeeDetailModal";
import { postApi } from "../api/SystemApi/postApi";

export const educationOptions = [
    { label: "선택", value: "" },
    { label: "고등학교 졸업", value: "고등학교 졸업" },
    { label: "전문대학 졸업", value: "전문대학 졸업" },
    { label: "대학교 졸업", value: "대학교 졸업" },
    { label: "대학원 졸업", value: "대학원 졸업" },
];

export const bankOptions = [
    { label: "선택", value: "" },
    { label: "국민은행", value: "국민은행" },
    { label: "신한은행", value: "신한은행" },
    { label: "우리은행", value: "우리은행" },
    { label: "하나은행", value: "하나은행" },
    { label: "농협은행", value: "농협은행" },
    { label: "기업은행", value: "기업은행" },
    { label: "카카오뱅크", value: "카카오뱅크" },
    { label: "토스뱅크", value: "토스뱅크" },
    { label: "새마을금고", value: "새마을금고" },
];

export const sexOptionse = [
    { label: "선택", value: "" },
    { label: "여성", value: "여성" },
    { label: "남성", value: "남성" },
];

export const statusOptions = [
    { value: "W", label: "재직" },
    { value: "O", label: "휴직" },
    // { value: "F", label: "퇴직" },
];
export const fetchDepartmentOptions = async () => {
    const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);
    return result
        ? setSelectOption(result.DepartmentGroupList, "departmentDetailName", "departmentDetailName", {
              label: "전체",
              value: "",
          })
        : [];
};

export const fetchJobGradeOptions = async () => {
    const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);
    return result
        ? setSelectOption(result.JobGradeGroupList, "jobGradeDetailName", "jobGradeDetailName", {
              label: "전체",
              value: "",
          })
        : [];
};

export const fetchJobRoleOptions = async (departmentDetailName: string) => {
    const params = new URLSearchParams();
    params.append("departmentDetailName", departmentDetailName);

    const response = await postApi<IJobRoleResponse>(Employee.getJobRolesByDepartment, params);

    return response.jobRoleGroupList;
};
