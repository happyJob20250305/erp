import styled from "styled-components";

export const EmployeeSearchStyled = styled.div`
    display: inline-block;
    gap: 5px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;

    .searchBar {
        display: flex;
        align-items: center;
        gap: 30px;
        width: 100%; /* 부모 기준으로 꽉 채우기 */
    }

    .button-container {
        display: flex;
        gap: 5px;
    }

    .searchBarBox {
        width: 1300px; /* 고정 넓이 */
        display: flex;
        flex-direction: column; /* 위아래로 나란히 */
        gap: 10px; /* 위아래 간격 */
        border: 1px solid black; /* 확인용 */
    }
`;
