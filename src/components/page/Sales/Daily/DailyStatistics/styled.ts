import styled from "styled-components";

export const DailyStatisticsStyled = styled.div`
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0px 0px 100px;
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
        background-color: rgb(198, 204, 209);
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        cursor: pointer;
    }
`;
export const StyledTh = styled.th`
    background-color: #f4f4f4;
    padding: 12px;
    border: 1px solid #ddd;
    width: 60%;
`;

export const StyledTd = styled.td<{ size?: number }>`
    padding: 12px;
    border: 1px solid #ddd;
    width: ${(props) => props.size}%;
`;
