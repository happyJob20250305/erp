import styled from "styled-components";

export const PromotionSearchStyled = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 5px;

    .search-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
    }

    .search-bar {
        display: flex;
        align-items: center;
        gap: 5px;
        flex: 1; /* 왼쪽 정렬 */
        min-width: 600px;
    }

    .button-container {
        display: flex;
        text-align: right;
        margin-left: auto;
        gap: 5px;
    }
`;
