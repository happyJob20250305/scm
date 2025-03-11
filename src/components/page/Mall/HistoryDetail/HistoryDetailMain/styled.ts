import styled from "styled-components";

export const HistoryDetailMainStyled = styled.div`

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 50px 0;
    }

    table,
    th,
    td {
        border: 1px solid #ddd;
    }

    th,
    td {
        padding: 12px;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
        font-weight: bold;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    .td-pointer:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

export const HistoryDetailStyled = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 5px;
`;

