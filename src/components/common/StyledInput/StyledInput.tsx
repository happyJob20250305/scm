import React, { forwardRef } from "react";
import { StyledInputStyled } from "./styled";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: "default" | "outline" | "filled";
    size?: "small" | "medium" | "large" | "modal" | "search"; // ✅ 우리가 원하는 `size` 타입
    fullWidth?: boolean;
    error?: boolean;
    as?: string;
}

export const StyledInput = forwardRef<HTMLInputElement, InputProps>(
    ({ as = "input", ...props }, ref) => {
        return <StyledInputStyled as={as} ref={ref} {...props} />;
    }
);
