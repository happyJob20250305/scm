import { useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable"
import { CartMainStyled } from "./styled"
import { ICart, ICartDetailWithImage, ICartListBodyResponse } from "../../../../../models/interface/ICart";
import { searchApi } from "../../../../../api/MallApi/searchApi";
import { Cart } from "../../../../../api/api";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { postApi } from "../../../../../api/MallApi/postApi";
import Swal from "sweetalert2";

export const CartMain= () => {
    const [cartList, setCartList] = useState<ICartDetailWithImage[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [cartdetailIdList, setCartdetailIdList] = useState<any[]>([]);
    
    const columns = [
        { key: "select", title: "선택" },
        { key: "image", title: "제품사진"},
        { key: "name", title: "제품명"},
        { key: "price", title: "가격"},
        { key: "count", title: "수량"},
        { key: "totalPrice", title: "총금액"},
        { key: "requestedDeliveryDate", title: "납품 희망날짜"},
        { key: "actions", title: "삭제"},
    ] as Column<ICart>[];

    useEffect(() => {
        searchCart();
        console.log(cartList);
    }, []);

    const searchCart = async (currentPage?: number) => {   
        currentPage = currentPage || 1; 
        const result = await searchApi<ICartListBodyResponse>(Cart.searchList, {
            currentPage,
            pageSize: 5,
        })
        if(result) {
            setCartList(result.cartDetailWithImage);
            calculateTotalAmount(result.cartDetailWithImage);
            calculateSelectedPrice(selectedRows, result.cartDetailWithImage);
        }
    };

    const calculateTotalAmount = (cartData: ICartDetailWithImage[]) => {
        const total = cartData.reduce((sum, item) => sum + item.cartDetail.count * item.cartDetail.price, 0);
        setTotalAmount(total);
    };

    const calculateSelectedPrice = (selectedIds: number[], cartData: ICartDetailWithImage[]) => {
        const selectedTotal = cartData
            .filter(item => selectedIds.includes(item.cartDetail.cartdetailId))
            .reduce((sum, item) => sum + item.cartDetail.count * item.cartDetail.price, 0);
        setSelectedPrice(selectedTotal);
    };

    const handlerCheckboxChange = (cartdetailId: number) => {
        setSelectedRows(prev => 
            {const newSelected = prev.includes(cartdetailId) 
                ? prev.filter(id => id !== cartdetailId) 
                : [...prev, cartdetailId];

            calculateSelectedPrice(newSelected, cartList);
            setCartdetailIdList([...prev, cartdetailId]);
            return newSelected;
        });
    };

    const deleteCartDetail = async (cartdetailId) => {
        const result = await postApi(Cart.deleteCartDetail, { cartdetailId });
        
        if(!confirm("삭제하시겠습니까?")) {
            return;
        } else {
            if (result.result === "success") {
                alert("삭제되었습니다.");
                postSuccess();
            }
        }

        
    };

    const postSuccess = () => {
        searchCart();
    };

    const order = async () => {

    const cartdetailIdListString = cartdetailIdList.map(String);
        
        if(selectedRows.length < 1) {
            alert('선택한 상품이 없습니다.');
            return;
        }

        if(!confirm('입금하시겠습니까?')) {
            return;
        } else {
            const result = await postApi(Cart.historysSave, cartdetailIdListString);
            if (result.result === "success") {
                Swal.fire({
                    icon: "success",
                    title: "주문 완료",
                    confirmButtonText: "확인",
                }).then(() => {
                    postSuccess(); // 승인 후 실행할 함수
                });
            }
        }
        
    }

    return (
        <CartMainStyled>
            <StyledTable
                data={cartList.map(item => ({
                    ...item.cartDetail,
                    image: <img src = {item.image.logicalPath || "default_image_url"} />,
                    select: <input type="checkbox"></input>
                }))}
                columns={columns}
                renderCell={(row, column) => {
                    if (column.key === "select") {
                        return (
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(row.cartdetailId)}
                                onChange={() => handlerCheckboxChange(row.cartdetailId)}
                            />
                        );
                    }
                    if (column.key === "totalPrice") {
                        const totalPrice = row.count * row.price;
                        return totalPrice.toLocaleString("ko-KR");
                    }
                    if (column.key === "requestedDeliveryDate") {
                        return row.requestedDeliveryDate.split(" ")[0]; // 날짜 부분만 출력
                    }
                    return row[column.key as keyof ICart];
                }}
                renderAction={(row) => (
                    <StyledButton size='small' onClick={() => deleteCartDetail(row.cartdetailId)}>
                        삭제
                    </StyledButton>
                )}
            />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                <h3>장바구니 총액</h3>            
                전체금액: 
                <StyledInput size="small" value={totalAmount.toLocaleString("ko-KR")} readOnly/>  
                선택금액: 
                <StyledInput size="small" value={selectedPrice.toLocaleString("ko-KR")} readOnly/>          
                <StyledButton onClick={order}>주문</StyledButton>
            </div>

        </CartMainStyled>
    )
}