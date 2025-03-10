import { OrdersProvider } from "../../api/Provider/OrdersProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { OrdersMain } from "../../components/page/tasks/Orders/OrdersMain/OrdersMain";
import { OrdersSearch } from "../../components/page/tasks/Orders/OrdersSearch/OrdersSearch";
export const Orders = () => {
    return (
        <OrdersProvider>
            <ContentBox variant='primary' fontSize='large'>
                발주 지시서
            </ContentBox>

            <OrdersSearch />
            <OrdersMain />
        </OrdersProvider>
    );
};
