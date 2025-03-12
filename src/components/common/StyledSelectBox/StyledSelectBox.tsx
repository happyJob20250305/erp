import { FC } from "react";
import { SelectBox } from "./styled";

interface SelectBoxProps {
    options: { label: string; value: string | number }[];
    value?: string | number;
    onChange?: React.Dispatch<React.SetStateAction<string | number>>;
    variant?: "default" | "primary" | "danger";
    fullwidth?: boolean;
    name?: string;
    defaultValue?: string | number;
}

export const StyledSelectBox: FC<SelectBoxProps> = ({
    name,
    options,
    value,
    onChange,
    variant = "default",
    fullwidth = false,
    defaultValue,
}) => {
    return (
        <SelectBox
            key={defaultValue}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => onChange?.(e.target.value)}
            variant={variant}
            fullwidth={fullwidth || undefined}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </SelectBox>
    );
};
