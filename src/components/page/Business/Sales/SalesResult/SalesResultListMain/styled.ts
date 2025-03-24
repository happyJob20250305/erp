import styled from "styled-components";

export const SalesResultListMainStyled = styled.div`
    // display: flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 5px;

    .info {
        width: 97%;
        padding: 16px;
        margin: 10px 0;
        background-color: #f0f0f0;
        border-radius: 6px;
        border: 1px solid #ccc;

        display: flex;
        justify-content: space-between;
        align-items: center;
        // border: 2px solid black;
    }

    table,
    th,
    td {
        border: 1px solid #ddd;
    }

    .tables {
        display: flex;
    }

    th,
    td {
        padding: 12px;
        text-align: center;
    }

    th {
        background-color: #f4f4f4;
        font-weight: bold;
        text-align: center;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    .td-pointer:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

export const Table = styled.table.withConfig({
    shouldForwardProp: (prop) => !["bordered", "fullWidth"].includes(prop),
})<{ fullWidth?: boolean; bordered?: boolean }>`
    width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
    border-collapse: collapse;
    ${({ bordered }) => (bordered ? "border: 1px solid #ddd;" : "")}
    text-align : center;
    margin-bottom: 40px;
    margin-top: 50px;
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
