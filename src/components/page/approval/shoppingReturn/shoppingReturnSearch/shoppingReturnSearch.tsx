import { useContext, useRef, useState } from "react";
import { ApprovalShoppingReturnContext } from "../../../../../api/Provider/approval/ApprovalShoppingReturn";
import { ApprovalShoppingReturnSearchStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const ApprovalShoppingReturnSearch = () => {
    const inputValue = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const { setSearchKeyword } = useContext(ApprovalShoppingReturnContext);

    const handlerSearch = () => {
        setSearchKeyword({
            searchTitle: inputValue.current.value,
            searchStDate: startDate,
            searchEdDate: endDate,
        });
    };

    return (
        <ApprovalShoppingReturnSearchStyled>
            제품명
            <StyledInput ref={inputValue}></StyledInput>
            반품일자
            <StyledInput type='date' onChange={(e) => setStartDate(e.target.value)}></StyledInput>
            <StyledInput type='date' onChange={(e) => setEndDate(e.target.value)}></StyledInput>
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
        </ApprovalShoppingReturnSearchStyled>
    );
};
