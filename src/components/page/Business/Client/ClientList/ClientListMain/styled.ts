import styled from "styled-components";

export const ClientListMainStyled = styled.div`
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
