import styled from "styled-components";

export const ShoppingReturnListModalStyled = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    top: 0;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    font-weight: bold;

    .container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        width: 1200px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
    }

    th {
        background: #f4f4f4;
        text-align: center;
        width: 120px;
    }

    .product-image {
        width: 100px;
        height: 100px;
        object-fit: contain;
        border: 1px solid #ddd;
        background: white;
    }

    .text-area {
        width: 100%;
        height: 60px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: none;
        box-sizing: border-box;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    button {
        flex: 1;
        background-color: #3bb2ea;
        border: none;
        color: white;
        padding: 10px;
        margin: 0 5px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 6px;
        box-shadow: 0 2px #999;
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

    .signtitle {
        text-align: center;
        margin-bottom: 25px;
        font-size: 150%;
    }

    .bottomButtonArea {
        text-align: center;
        margin-top: 15px;
    }
    .cancelButton {
        background-color: rgb(234, 59, 59);
        &:hover {
            background-color: rgb(170, 12, 12);
        }
        &:active {
            background-color: rgb(170, 12, 12);
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
    }
    .font_red {
        color: #fe1414;
    }

    .findTitle {
        cursor: pointer;
    }
    .refresh-button {
        background: none;
        border: none;
        font-size: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .refresh-icon {
        width: 16px;
        height: 16px;
        border: 2px solid #000;
        border-radius: 50%;
        border-top: 2px solid transparent;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }
    .reset {
        width: 30px;
        &:hover {
            cursor: pointer;
            animation: spin 1s linear infinite;
        }
    }
`;
