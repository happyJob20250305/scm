import { useContext, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ApprovalOrderSearchStyled } from "./styled";
import { ApprovalOrderContext } from "../../../../../api/Provider/approval/ApprovalOrderProvider";

export const ApprovalOrderSearch = () => {
    const inputValue = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const { setSearchKeyword } = useContext(ApprovalOrderContext);

    const handlerSearch = () => {
        setSearchKeyword({
            searchTitle: inputValue.current.value,
            searchStDate: startDate,
            searchEdDate: endDate,
        });
    };

    return (
        <ApprovalOrderSearchStyled>
            제품명
            <StyledInput ref={inputValue}></StyledInput>
            구매일자
            <StyledInput type='date' onChange={(e) => setStartDate(e.target.value)}></StyledInput>
            <StyledInput type='date' onChange={(e) => setEndDate(e.target.value)}></StyledInput>
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
        </ApprovalOrderSearchStyled>
    );
};
