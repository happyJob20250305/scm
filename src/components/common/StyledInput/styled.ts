import styled from "styled-components";
import { InputProps } from "./StyledInput";

export const StyledInputStyled = styled.input<InputProps & { as?: string }>`
    font-size: 16px;
    padding: 10px;
    border-radius: 6px;
    outline: none;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;

    /* 크기별 스타일 */
    ${({ size }) => {
        switch (size) {
            case "small":
                return `padding: 6px 10px; font-size: 14px; `;
            case "large":
                return `padding: 12px 16px; font-size: 18px;`;
            case "modal":
                return `padding: 6px 10px; font-size: 12px;`;
            case "search":
                return `padding: 6px 10px; font-size: 18px; width:210px;`;
            default:
                return `padding: 10px 14px; font-size: 16px;`;
        }
    }}

    /* 가로 100% 옵션 */
  ${({ fullWidth }) => fullWidth && `width: 100%;`}

  /* 스타일 변형 */
  ${({ variant }) => {
        switch (variant) {
            case "outline":
                return `
          border: 2px solid #3498db;
          background-color: transparent;
          &:focus {
            border-color: #2980b9;
          }
        `;
            case "filled":
                return `
          background-color: #ecf0f1;
          border: none;
          &:focus {
            background-color: #d5dbdb;
          }
        `;
            default:
                return `
          border: 1px solid #ccc;
          &:focus {
            border-color: #2980b9;
          }
        `;
        }
    }}

  /* 에러 상태 */
  ${({ error }) =>
        error &&
        `
      border-color: #e74c3c !important;
      &:focus {
        border-color: #c0392b !important;
      }
    `}

    /* ✅ textarea일 때 적용될 스타일 추가 */
    ${({ as }) =>
        as === "textarea" &&
        `
        min-height: 150px;
        display:block;
        resize: vertical;
        overflow-wrap: anywhere;
        word-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
        overflow: auto;
        border: 1px solid #ccc;
          &:focus {
            border-color: #2980b9;
          }
    `}
`;
