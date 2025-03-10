import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { Inventory } from "../../../../../api/api";
import { InventorySubGridStyled } from "./styled";
import {
    IInventory,
    IInventoryDetailResponse,
    IInventoryPropsOptions,
} from "../../../../../models/interface/IInventory";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

interface IInventorySubGridProps {
    inventoryPropsOption: IInventoryPropsOptions;
}

export const InventorySubGrid: FC<IInventorySubGridProps> = ({ inventoryPropsOption }) => {
    const [inventoryDetail, setInventoryDetail] = useState<IInventory[]>([]);
    const [modal, setModal] = useRecoilState(modalState);

    const columns = [
        { key: "productName", title: "제품명" },
        { key: "warehouseName", title: "창고명" },
        { key: "warehouseCode", title: "창고코드" },
        { key: "warehouseAddress", title: "창고위치" },
        { key: "warehouseManager", title: "담당자" },
        { key: "input", title: "입고량" },
        { key: "output", title: "출고량" },
        { key: "quantity", title: "결과수량" },
    ] as Column<IInventory>[];

    useEffect(() => {
        searchInventoryDetail();
    }, [inventoryPropsOption]);

    const searchInventoryDetail = async () => {
        const result = await searchApi<IInventoryDetailResponse>(Inventory.searchDetail, inventoryPropsOption);

        if (result) {
            setInventoryDetail(result.detailValue);
        }
    };

    const modalClose = () => {
        setModal(!modal);
    };

    return (
        <InventorySubGridStyled>
            <StyledTable
                data={inventoryDetail}
                columns={columns}
                renderCell={(row, col) => {
                    // 입고량, 출고량 컬럼의 색상 변경
                    if (col.key === "input" && row.input > 0) {
                        return <span style={{ color: "blue" }}>{row.input}</span>; // ✅ 입고량은 파란색
                    }
                    if (col.key === "output" && row.output > 0) {
                        return <span style={{ color: "red" }}>{row.output}</span>; // ✅ 출고량은 빨간색
                    }
                    return row[col.key as keyof IInventory]; // 기본값
                }}
                renderHead={(col) => {
                    // ✅ th 색상 변경 (입고량: 파란색, 출고량: 빨간색)
                    if (col.key === "input") {
                        return <span style={{ color: "blue" }}>{col.title}</span>;
                    }
                    if (col.key === "output") {
                        return <span style={{ color: "red" }}>{col.title}</span>;
                    }
                    return col.title;
                }}
            />
            <div className="closeButton">
                <StyledButton size='small' onClick={() => setModal(!modal)}>
                    취소
                </StyledButton>
            </div>
        </InventorySubGridStyled>
    );
};
