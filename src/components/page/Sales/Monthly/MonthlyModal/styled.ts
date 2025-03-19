import styled from "styled-components";

export const MonthlyModalStyled = styled.div`
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;

    label {
        display: flex;
        flex-direction: column;
    }

    .container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        position: relative;
        width: 400px;
    }

    .bi-x-lg {
        display: flex;
        justify-content: flex-end;
    }
`;

export const MonthlyStyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 0px 0px 0px 0px;
    font-size: 18px;
    text-align: left;
    table-layout: fixed;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
`;

export const StyledTh = styled.th<{ size?: number }>`
    background-color: #f4f4f4;
    padding: 12px;
    border: 1px solid #ddd;
    width: ${(props) => props.size}%;
`;

export const StyledTd = styled.td<{ size?: number }>`
    padding: 12px;
    border: 1px solid #ddd;
    width: ${(props) => props.size}%;
`;
