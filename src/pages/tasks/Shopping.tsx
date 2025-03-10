import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ShoppingMain } from "../../components/page/tasks/Shopping/ShoppingMain/ShoppingMain";
import { ShoppingSearch } from "../../components/page/tasks/Shopping/ShoppingSearch/ShoppingSearch";

export const Shopping = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                주문배송 지시서
            </ContentBox>

            <ShoppingSearch />
            <ShoppingMain />
        </>
    );
};
