import { ProductsProvider } from "../../api/Provider/ProductsProvider"
import { ContentBox } from "../../components/common/ContentBox/ContentBox"
import { ProductsMain } from "../../components/page/Mall/Products/ProductsMain/ProductsMain"
import { ProductsSearch } from "../../components/page/Mall/Products/ProductsSearch/ProductsSearch"

export const Products = () => {
    return (    
        <ProductsProvider>
            <ContentBox variant='primary' fontSize='large'>
                제품 목록
            </ContentBox>
            <ProductsSearch />
            <ProductsMain />
        </ProductsProvider>
    )
}