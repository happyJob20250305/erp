import styled from "styled-components";
import { InputProps } from "./StyledInput";

export const StyledInputStyled = styled.input<InputProps>`
    font-size: 16px;
    padding: 10px;
    margin-left: 20px;
    margin-right: 50px;
    border-radius: 6px;
    outline: none;
    transition: all 0.3s ease-in-out;

    /* 크기별 스타일 */
    ${({ size }) => {
        switch (size) {
            case "small":
                return `padding: 6px 10px; font-size: 14px;`;
            case "large":
                return `padding: 12px 16px; font-size: 18px;`;
            default:
                return `padding: 10px 14px; font-size: 16px;`;
        }
    }}

    /* 가로 옵션 */
  ${({ width }) => `width: ${width}px;`}

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
`;
