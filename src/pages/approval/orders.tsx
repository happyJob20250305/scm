import { ApprovalOrderProvider } from "../../api/Provider/approval/ApprovalOrderProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ApprovalOrderMain } from "../../components/page/approval/orders/orderMain/orderMain";
import { ApprovalOrderSearch } from "../../components/page/approval/orders/orderSearch/orderSearch";

export const ApprovalOrder = () => {
    return (
        <>
            <ApprovalOrderProvider>
                <ContentBox variant='primary' fontSize='large'>
                    구매 승인
                </ContentBox>
                <ApprovalOrderSearch />
                <ApprovalOrderMain />
            </ApprovalOrderProvider>
        </>
    );
};
