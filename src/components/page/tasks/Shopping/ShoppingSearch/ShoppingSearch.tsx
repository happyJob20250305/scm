import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ShoppingSearchStyled } from "./styled";

export const ShoppingSearch = () => {
    const customerName = useRef<HTMLInputElement>();
    const [salesDate, setSalesDate] = useState<string>(); // 하나의 날짜로 관리
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const navigate = useNavigate();

    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace: true });
    }, []);

    const handlerSearch = () => {
        const query: string[] = [];
        !customerName.current.value || query.push(`searchCustomerName=${customerName.current.value}`);
        !salesDate || query.push(`searchSalesDate=${salesDate}`); // 하나의 날짜로 쿼리 처리

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/tasks/shopping${queryString}`);
    };

    return (
        <ShoppingSearchStyled>
            <StyledInput ref={customerName} placeholder='고객기업명을 입력해주세요.' />
            <StyledInput type='date' onChange={(e) => setSalesDate(e.target.value)} /> {/* 하나의 입력 필드로 변경 */}
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </ShoppingSearchStyled>
    );
};
