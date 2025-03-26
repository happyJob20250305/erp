import styled from "styled-components";

const ClientListModalStyled = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;

    label {
        font-weight: bold;
        display: flex;
        flex-direction: column;
    }

    input[type="text"] {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
    textarea {
        width: 800px;
        height: 50px;
    }

    .container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        position: relative;
        width: 1080px;
    }

    .button-container {
        text-align: right;
        margin-top: 10px;
    }
    button {
        background-color: #3bb2ea;
        border: none;
        color: white;
        padding: 10px 22px;
        text-align: right;
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

    .radio-group {
        display: flex;

        label {
            font-weight: initial;
            display: block;
        }
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ButtonArea = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
`;

const ModalStyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
        padding: 10px;
        border: 1px solid #ddd;
    }

    th {
        background: #e9ecef;
        color: black;
        text-align: center;
        font-size: 15px;
        width: 70px;
    }

    th label {
        display: inline-flex;
        align-items: center;
    }

    th .asterisk {
        color: red;
        margin-left: 5px;
    }
    td {
        background: white;
        width: 150px;
        text-align: center;
    }
`;

export { ClientListModalStyled, ModalOverlay, ButtonArea, ModalStyledTable };
