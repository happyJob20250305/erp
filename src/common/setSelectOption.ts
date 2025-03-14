import { ISetListOption } from "../models/interface/ISetListOption";

export const setSelectOption = <T extends Record<string, any>>(
    items: T[],
    labelKey: keyof T,
    valueKey: keyof T,
    defaultOption?: { label: string; value: string }
): ISetListOption[] => {
    const defaultItem = defaultOption ? { label: defaultOption.label ?? "", value: defaultOption.value ?? "" } : null;

    return [
        ...(defaultItem ? [defaultItem] : []),
        ...items.map((item) => ({
            label: String(item[labelKey]),
            value: String(item[valueKey]),
        })),
    ];
};
