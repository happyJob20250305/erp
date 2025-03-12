import styled from "styled-components";

export const VoucherListSearchStyled = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
`;

export const SearchTable = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
`;

export const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 15px;
    align-items: center;
`;

export const TableCell = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 200px;
    &.search-button {
        justify-content: flex-end; // 검색 버튼을 오른쪽 끝으로 정렬
    }
`;
