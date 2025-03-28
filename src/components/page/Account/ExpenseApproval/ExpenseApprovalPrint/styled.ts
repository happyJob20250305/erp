import styled from "styled-components";

export const ExpenseApprovalPrintStyle = styled.div`
    .print-section {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }

    @media print {
        .print-section {
            visibility: visible;
            position: static;
        }
    }
`;

export const ExpensePrintTable = styled.div`
    width: 100%;
    margin-top: 20px;

    table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 10px;
        width: 150px;
    }

    th {
        background: #e9ecef;
        color: black;
        text-align: left;
        font-size: 15px;
    }

    td {
        background: white;
        text-align: left;
    }

    th[colspan="6"] {
        background: #e9ecef;
    }

    td[colspan="6"] {
        width: 600px;
    }

    display: block;
    width: 100%;
`;

export const Sign = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
