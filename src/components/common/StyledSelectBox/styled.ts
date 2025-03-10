import styled from "styled-components";

export const SelectBox = styled.select.withConfig({
    shouldForwardProp: (prop) => prop !== "fullWidth" && prop !== "fixedWidth",
})<{ variant: string; fullwidth?: boolean; fixedWidth?:boolean }>`
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: ${({ variant }) =>
        variant === "primary" ? "#3498db" : variant === "danger" ? "#e74c3c" : "#fff"};
    color: ${({ variant }) => (variant === "default" ? "#333" : "#fff")};
    width: ${({ fixedWidth, fullwidth }) => (fixedWidth? "150px" : fullwidth ? "100%" : "auto")};
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:focus {
        outline: none;
        border-color: ${({ variant }) =>
            variant === "primary" ? "#2980b9" : variant === "danger" ? "#c0392b" : "#666"};
    }
`;
