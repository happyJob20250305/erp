import styled from "styled-components";

export const SelectBox = styled.select.withConfig({
    shouldForwardProp: (prop) => prop !== "fullWidth",
})<{ variant: string; fullwidth?: boolean }>`
    padding: 10px;
    margin-left: 30px;
    margin-right: 70px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: ${({ variant }) =>
        variant === "primary" ? "#3498db" : variant === "danger" ? "#e74c3c" : "#fff"};
    color: ${({ variant }) => (variant === "default" ? "#333" : "#fff")};
    width: ${({ fullwidth }) => (fullwidth ? "100%" : "auto")};
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:focus {
        outline: none;
        border-color: ${({ variant }) =>
            variant === "primary" ? "#2980b9" : variant === "danger" ? "#c0392b" : "#666"};
    }
`;
