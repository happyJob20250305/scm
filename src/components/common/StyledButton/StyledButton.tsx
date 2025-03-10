import { FC } from "react";
import { StyledButtonStyled } from "./styled";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large" | "close";
    fullWidth?: boolean;
}

export const StyledButton: FC<ButtonProps> = ({ children, ...props }) => {
    return <StyledButtonStyled {...props}>{children}</StyledButtonStyled>;
};
