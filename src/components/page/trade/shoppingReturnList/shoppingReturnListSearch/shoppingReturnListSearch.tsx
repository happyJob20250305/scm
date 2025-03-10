import { useContext, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ShoppingReturnListSearchStyled } from "./styled";
import { ShoppingReturnListContext } from "../../../../../api/Provider/trade/ShoppingReturnListProvider";

export const ShoppingReturnListSearch = () => {
    const options = [
        { label: "반품제품명", value: "searchProduct" },
        { label: "반품신청날짜", value: "searchReturnDate" },
    ];

    const [selectValue, setSelectValue] = useState<string>("searchProduct");
    const [inputValue, setInputValue] = useState<string>("");
    const { setSearchKeyword } = useContext(ShoppingReturnListContext);

    const handlerSearch = () => {
        if (!inputValue) return;

        setSearchKeyword({
            searchOption: selectValue,
            searchKeyword: inputValue,
        });
    };
    // selectValue가 변경될 때 input 값 초기화
    const handleSelectChange = (newValue: string) => {
        setSelectValue(newValue);
        setInputValue(""); // 기존 입력값 초기화
    };

    return (
        <ShoppingReturnListSearchStyled>
            {/* Select Box */}
            <StyledSelectBox options={options} value={selectValue} onChange={handleSelectChange} />

            {/* Input 필드 변경 */}
            {selectValue === "searchReturnDate" ? (
                <StyledInput
                    size='search'
                    value={inputValue}
                    type='date'
                    onChange={(e) => setInputValue(e.target.value)}
                />
            ) : (
                <StyledInput
                    size='search'
                    value={inputValue}
                    type='text'
                    onChange={(e) => setInputValue(e.target.value)}
                />
            )}

            {/* 검색 버튼 */}
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
        </ShoppingReturnListSearchStyled>
    );
};
