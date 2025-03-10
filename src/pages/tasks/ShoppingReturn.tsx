import { ShoppingReturnProvider } from "../../api/Provider/ShoppingReturnProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ShoppingReturnMain } from "../../components/page/tasks/ShoppingReturn/ShoppingReturnMain/ShoppingReturnMain";
import { ShoppingReturnSearch } from "../../components/page/tasks/ShoppingReturn/ShoppingReturnSearch/ShoppingReturnSearch";

export const ShoppingReturn = () => {
    return (
        <ShoppingReturnProvider>
            <ContentBox variant='primary' fontSize='large'>
                주문 반품 지시서
            </ContentBox>

            <ShoppingReturnSearch />
            <ShoppingReturnMain />
        </ShoppingReturnProvider>
    );
};
