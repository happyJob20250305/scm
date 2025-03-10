import { ContentBox } from "../../components/common/ContentBox/ContentBox"
import { CartMain } from "../../components/page/Mall/Cart/CartMain/CartMain"

export const Cart = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                장바구니
            </ContentBox>
            <CartMain/>
        </>
    )
}