import { ProductsMainStyled } from "./styled"

import { searchApi } from "../../../../../api/MallApi/searchApi";
import { Products } from "../../../../../api/api";
import { useContext, useEffect, useState } from "react";
import { IProducts, IProductsListBodyResponse } from "../../../../../models/interface/IProducts";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { ProductsContext } from "../../../../../api/Provider/ProductsProvider";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { ProductsModal } from "../ProductsModal/ProductsModal";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";

export const ProductsMain = () => {
    const [productsList, setProductsList] = useState<IProducts[]>([]);
    const [productsCount, setProductsCount] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const { searchKeyword } = useContext(ProductsContext);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [productId, setProductId] = useState<number>(0);
    const { setUserType } = useContext(ProductsContext);


    const columns = [
        { key: "productId", title: "제품 ID"},
        { key: "categoryName", title: "제품 분류"},
        { key: "productNumber", title: "제품 번호", clickable: true},
        { key: "name", title: "제품명"},
        { key: "supplyName", title: "제조사"},
        { key: "sellPrice", title: "판매 가격"},
    ] as Column<IProducts>[];

    useEffect(() => {
        searchProductsList();
    }, [searchKeyword]);

    const searchProductsList = async(currentPage?: number) => {
        currentPage = currentPage || 1;

       const result = await searchApi<IProductsListBodyResponse>(Products.searchList, {
            ...searchKeyword,
            currentPage,
            pageSize: 5,
       });
        
       if(result) {
        console.log(result);
            setProductsList(result.products);
            setProductsCount(result.productsCnt);
            setCPage(currentPage);
            setUserType(result.userType);

       }
    }

    const handlerModal = (id: number) => {
        setModal(!modal);
        setProductId(id);
    }

    const postSuccess = () => {
        setModal(!modal);
        searchProductsList(cPage);
    };

    return (
        <ProductsMainStyled>  
            <StyledTable 
                data={productsList}
                columns={columns}
                onCellClick={(row, column) => {
                    if(column === "productNumber") {
                        // TODO
                        handlerModal(row.productId);
                    }
                }}
            />
            <PageNavigate 
            totalItemsCount={productsCount}
            onChange={searchProductsList}
            itemsCountPerPage={5}
            activePage={cPage}
            />
            {modal && (
                <Portal>
                    <ProductsModal productId={productId} postSuccess={postSuccess} setProductId={setProductId}></ProductsModal>
                </Portal>
            )}
        </ProductsMainStyled>       
    )
}