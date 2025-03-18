import styled from "styled-components";

// ✅ 불필요한 속성이 DOM에 전달되지 않도록 설정
export const Table = styled.table.withConfig({
    shouldForwardProp: (prop) => !["bordered", "fullWidth"].includes(prop),
})<{ fullWidth?: boolean; bordered?: boolean }>`
    width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
    border-collapse: collapse;
    ${({ bordered }) => (bordered ? "border: 1px solid #ddd;" : "")}
    text-align : center;
`;

export const Thead = styled.thead`
    background-color: #f8f9fa;
    font-weight: bold;
`;

export const Th = styled.th.withConfig({
    shouldForwardProp: (prop) => !["bordered"].includes(prop),
})<{ bordered?: boolean }>`
    padding: 10px;
    text-align: center;
    ${({ bordered }) => (bordered ? "border: 1px solid #ddd;" : "")}
`;

export const Td = styled.td.withConfig({
    shouldForwardProp: (prop) => prop !== "clickable",
})<{ bordered?: boolean; clickable?: boolean }>`
    padding: 10px;
    ${({ bordered }) => (bordered ? "border: 1px solid #ddd;" : "")}
    ${({ clickable }) =>
        clickable && "cursor: pointer; &:hover { background-color: #e0e0e0; text-decoration: underline; }"}
`;

export const Tr = styled.tr.withConfig({
    shouldForwardProp: (prop) => !["striped", "hoverable"].includes(prop),
})<{ striped?: boolean; hoverable?: boolean }>`
    ${({ striped }) => striped && "&:nth-child(even) { background-color: #f2f2f2; }"}
    ${({ hoverable }) => hoverable && "&:hover { background-color: #e9ecef; }"}
`;
