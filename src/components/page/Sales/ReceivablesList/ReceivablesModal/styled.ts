//css 를 자바스크립트처럼 사용가능

import styled from "styled-components";
export const ReceivablesModalStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    .container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        position: relative;
        width: 90%;
        max-width: 800px; /* 최대 너비 설정 */
        max-height: 90vh; /* 화면 높이를 초과하지 않도록 설정 */
        overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능하게 설정 */
    }

    td {
        padding: 12px;
    }
    tr {
        padding: 12px;
    }

    .client-info {
        display: flex;
        flex-direction: column; /* 세로로 정렬된 각 항목들을 그 안에서 가로로 나열 */
    }

    .button-container {
        text-align: center;
        margin-top: 10px;
    }

    button {
        background-color: #3bb2ea;
        border: none;
        color: white;
        padding: 10px 22px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;
        transition: 0.3s;

        &:hover {
            background-color: #45a049;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
    }
`;
