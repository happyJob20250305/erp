import { ISetListOption } from "../models/interface/ISetListOption";

export const setSelectOption = <T extends Record<string, any>>(
    items: T[],
    labelKey: keyof T,
    valueKey: keyof T
): ISetListOption[] => {
    return [
        { label: "전체", value: "" },
        ...items.map((item) => ({
            label: String(item[labelKey]),
            value: String(item[valueKey]),
        })),
    ];
};
