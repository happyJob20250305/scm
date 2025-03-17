import styled from "styled-components";

export const OrdersListMainStyled = styled.div`

select {
  padding: 5px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: "#3498db"
  width: "80px"
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  }
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
        text-align: center;
    }

    th {
        background-color: #f4f4f4;
        font-weight: bold;
    }

    tr:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }

    .td-pointer:hover {
        cursor: pointer;
        text-decoration: underline;
    }
    .selected {
        background-color: #f1f1f1;
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
`;
