import { ApprovalShoppingReturnProvider } from "../../api/Provider/approval/ApprovalShoppingReturn";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ApprovalShoppingReturnMain } from "../../components/page/approval/shoppingReturn/shoppingReturnMain/shoppingReturnMain";
import { ApprovalShoppingReturnSearch } from "../../components/page/approval/shoppingReturn/shoppingReturnSearch/shoppingReturnSearch";

export const ApprovalShoppingReturn = () => {
    return (
        <>
            <ApprovalShoppingReturnProvider>
                <ContentBox variant='primary' fontSize='large'>
                    반품 승인
                </ContentBox>
                <ApprovalShoppingReturnSearch />
                <ApprovalShoppingReturnMain />
            </ApprovalShoppingReturnProvider>
        </>
    );
};
