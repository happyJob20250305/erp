import React, { forwardRef } from "react";
import { StyledInputStyled } from "./styled";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: "default" | "outline" | "filled" | "disable";
    size?: "small" | "medium" | "large"; // ✅ 우리가 원하는 `size` 타입
    fullWidth?: boolean;
    error?: boolean;
    width?: number;
}

export const StyledInput = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
    return <StyledInputStyled ref={ref} {...props} />;
});
