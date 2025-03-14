import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingListSearchStyled } from "../../shoppingList/ShoppingListSearch/styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";

export const OrderListSearch = () => {
    const title = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    // const [endDate, setEndDate] = useState<string>();
    const navigate = useNavigate();
    const options = [
        { label: "업체명", value: "searchUser" },
        { label: "발주처리일", value: "searchOrderDate" },
    ];
    const [selectValue, setSelectValue] = useState<string>("searchUser");

    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace: true });
    }, []);

    useEffect(() => {
        if (title.current !== null) {
            title.current.value = "";
        }
    }, [selectValue]);

    const handlerSearch = () => {
        // 검색 데이터를 url에 queryParam으로 옮겨 줄꺼입니다.
        const query: string[] = [];

        if (selectValue === "searchUser") {
            !title.current.value || query.push(`searchKeyword=${title.current.value}`);
            query.push(`searchOption=${selectValue}`);
        } else {
            !startDate || query.push(`searchKeyword=${startDate}`);
            query.push(`searchOption=${selectValue}`);
        }

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/delivery/orders-list${queryString}`);
    };

    return (
        <ShoppingListSearchStyled>
            <StyledSelectBox options={options} value={selectValue} onChange={setSelectValue} />
            {selectValue === "searchUser" ? (
                <StyledInput size='medium' ref={title}></StyledInput>
            ) : (
                <StyledInput size='medium' type='date' onChange={(e) => setStartDate(e.target.value)}></StyledInput>
            )}
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
        </ShoppingListSearchStyled>
    );
};
