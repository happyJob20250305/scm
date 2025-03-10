import { useContext, useEffect, useState } from "react";
import { ShoppingReturnContext } from "../../../../../api/Provider/ShoppingReturnProvider";
import { IShoppingReturn, IShoppingReturnBodyResponse } from "../../../../../models/interface/IShoppingReturn";
import { shoppingReturnSearchApi } from "../../../../../api/ShoppingReturnApi/searchApi";
import { ShoppingReturn } from "../../../../../api/api";
import { ShoppingReturnMainStyled } from "./styled";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";

export const ShoppingReturnMain = () => {
    const { searchKeyword } = useContext(ShoppingReturnContext);
    const [shoppingReturnList, setShoppingReturnList] = useState<IShoppingReturn[]>([]);
    const [shoppingReturnListCnt, setShoppingReturnListCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    const columns = [
        { key: "refundId", title: "번호" },
        { key: "productName", title: "제품명" },
        { key: "price", title: "단가" },
        { key: "count", title: "개수" },
        { key: "totalPrice", title: "총금액" },
        { key: "isApproved", title: "처리상태" },
        { key: "returnsRequestDate", title: "날짜" },
    ] as Column<IShoppingReturn>[];

    useEffect(() => {
        SearchShoppingReturn();
    }, [searchKeyword]);

    const SearchShoppingReturn = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await shoppingReturnSearchApi<IShoppingReturnBodyResponse>(ShoppingReturn.searchList, {
            ...searchKeyword,
            currentPage,
            pageSize: 5,
        });

        if (result) {
            setShoppingReturnList(result.shoppingReturnList);
        }
    };

    return (
        <ShoppingReturnMainStyled>
            <StyledTable data={shoppingReturnList} columns={columns} />
            <PageNavigate
                totalItemsCount={shoppingReturnListCnt}
                onChange={SearchShoppingReturn}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </ShoppingReturnMainStyled>
    );
};
