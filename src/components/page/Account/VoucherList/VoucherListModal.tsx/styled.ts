import styled from "styled-components";

const VoucherListModalStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 1080px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;
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
        text-align: left;
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
    }
`;

export { VoucherListModalStyle, ModalOverlay, ButtonArea, ModalStyledTable };
