import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { Inventory } from "../../../../../api/api";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { InventoryMainStyled } from "./styled";
import { InventoryContext } from "../../../../../api/Provider/trade/InventoryProvider";
import { IInventory, IInventoryListResponse, IInventoryPropsOptions } from "../../../../../models/interface/IInventory";
import { InventorySubGrid } from "../inventorySubGrid/inventorySubGrid";

const initInventoryPropsOptions = {
    inventoryId: 0,
    productId: 0,
    supplyId: 0,
    warehouseId: 0,
};

export const InventoryListMain = () => {
    const { searchTitle } = useContext(InventoryContext);
    const [cPage, setCPage] = useState<number>(0);
    const [inventoryList, setInventoryList] = useState<IInventory[]>([]);
    const [inventoryListCnt, setInventoryListCnt] = useState<number>(0);
    const [inventoryPropsOption, setInventoryPropsOption] = useState<IInventoryPropsOptions>(initInventoryPropsOptions);
    const [modal, setModal] = useRecoilState(modalState);

    const columns = [
        { key: "productId", title: "번호" },
        { key: "categoryName", title: "장비구분" },
        { key: "productNumber", title: "모델번호" },
        { key: "productName", title: "모델명" },
        { key: "supplyName", title: "제조사" },
        { key: "warehouseName", title: "창고" },
        { key: "quantity", title: "재고" },
    ] as Column<IInventory>[];

    useEffect(() => {
        searchInventory();
    }, [searchTitle]);

    const searchInventory = async (currentPage?: number) => {
        if (modal) {
            setModal(!modal);
        }
        currentPage = currentPage || 1;

        const result = await searchApi<IInventoryListResponse>(Inventory.searchList, {
            ...searchTitle,
            currentPage,
            pageSize: 5,
        });

        if (result) {
            setInventoryList(result.inventoryList);
            setInventoryListCnt(result.inventoryCnt);
            setCPage(currentPage);
        }
    };

    const handlerModal = (propsOptions: IInventoryPropsOptions) => {
        setInventoryPropsOption(propsOptions);
        if (!modal) {
            setModal(!modal);
        }
    };

    return (
        <InventoryMainStyled>
            <StyledTable
                data={inventoryList}
                columns={columns}
                onRowClick={(row) =>
                    handlerModal({
                        inventoryId: row.inventoryId,
                        productId: row.productId,
                        supplyId: row.supplyId,
                        warehouseId: row.warehouseId,
                    })
                }
            />
            <PageNavigate
                totalItemsCount={inventoryListCnt}
                onChange={searchInventory}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && <InventorySubGrid inventoryPropsOption={inventoryPropsOption} />}
        </InventoryMainStyled>
    );
};
