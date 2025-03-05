import styled from "styled-components";

export const DetailCodeMainStyled = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 50px 0;
    }

    table,
    th,
    td {
        border: 1px solid #ddd;
    }

    th,
    td {
        padding: 12px;
        text-align: left;
    }

    th {
        background-color: #bbc2cd;
        font-weight: bold;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    tbody tr {
        color: #868686;
    }
`;
