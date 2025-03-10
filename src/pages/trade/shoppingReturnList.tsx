
import { ShoppingReturnListProvider } from "../../api/Provider/trade/ShoppingReturnListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ShoppingReturnListMain } from "../../components/page/trade/shoppingReturnList/shoppingReturnListMain/shoppingReturnListMain";
import { ShoppingReturnListSearch } from "../../components/page/trade/shoppingReturnList/shoppingReturnListSearch/shoppingReturnListSearch";

export const ShoppingReturnList = () => {
    return (
        <>
            <ShoppingReturnListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    주문 반품 목록
                </ContentBox>
                <ShoppingReturnListSearch />
                <ShoppingReturnListMain />
            </ShoppingReturnListProvider>
        </>
    );
};
