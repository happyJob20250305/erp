import styled from "styled-components";
import { ButtonProps } from "./StyledButton";

export const StyledButtonStyled = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 6px;

    ${({ size }) => {
        switch (size) {
            case "small":
                return `padding: 6px 12px; font-size: 14px;`;
            case "large":
                return `padding: 12px 24px; font-size: 18px;`;
            default:
                return `padding: 10px 20px; font-size: 16px;`;
        }
    }}

    ${({ fullWidth }) => fullWidth && `width: 100%;`}

    ${({ variant }) => {
        switch (variant) {
            case "secondary":
                return `
        background-color: #f0f0f0;
        color: #333;
        &:hover {
            background-color: #e0e0e0;
        }
        `;
            case "danger":
                return `
        background-color: #e74c3c;
        color: #fff;
        &:hover {
            background-color: #c0392b;
        }
        `;
            default:
                return `
        background-color: #3498db;
        color: #fff;
        &:hover {
            background-color: #2980b9;
        }
        `;
        }
    }}
`;
