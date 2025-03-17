import styled from "styled-components";

export const EmployeeMainStyled = styled.div`
    margin-top: 5px;

    .button-container {
        display: flex;
        gap: 5px;
        padding: 10px;
    }

    .table-wrapper {
        width: 100%;
        overflow-x: auto; /* ✅ 가로 스크롤 자동 */
    }
`;
