import { useContext, useRef, useState } from "react";
import { OrdersContext } from "../../../../../api/Provider/OrdersProvider";
import { OrdersSearchStyled } from "./styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const OrdersSearch = () => {
    const options = [
        { label: "제품명", value: "productName" },
        { label: "발주업체명", value: "supplyName" },
    ];

    const inputValue = useRef<HTMLInputElement>();
    const [selectProductNameValue, setselectProductNameValue] = useState<string>("productName");
    const { setSearchKeyword } = useContext(OrdersContext);

    const handlerSearch = () => {
        setSearchKeyword({
            searchTag: selectProductNameValue,
            searchTitle: inputValue.current.value,
        });
    };

    return (
        <OrdersSearchStyled>
            <StyledSelectBox options={options} value={selectProductNameValue} onChange={setselectProductNameValue} />
            <StyledInput ref={inputValue} />
            <StyledButton onClick={handlerSearch}>검색</StyledButton>
        </OrdersSearchStyled>
    );
};
