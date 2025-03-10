import { Table, Td, Th, Thead, Tr } from "./styled";
import noData from "../../../assets/noData.png";

export interface Column<T> {
    key: keyof T | "actions";
    title: string;
    clickable?: boolean;
    width: string;
}

interface TableProps<T> {
    columns?: Column<T>[];
    data: T[];
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    fullWidth?: boolean;
    onRowClick?: (row: T) => void; // 추가
    onCellClick?: (row: T, column: keyof T) => void;
    renderAction?: (row: T) => React.ReactNode;
    renderCell?: (row: T, column: Column<T>) => React.ReactNode; // 추가
    renderHead?: (column: Column<T>) => React.ReactNode;
}

export const StyledTable = <T extends { [key: string]: any }>({
    columns,
    data,
    onCellClick,
    onRowClick,
    renderAction,
    striped,
    renderCell,
    bordered,
    hoverable,
    fullWidth,
    renderHead,
}: TableProps<T>) => {
    const generatedColumns =
        columns ??
        (data.length > 0
            ? Object.keys(data[0]).map((key) => ({ key: key as keyof T, title: key, clickable: false }))
            : []);

    return (
        <Table fullWidth={fullWidth} bordered={bordered}>
            <Thead>
                <tr>
                    {generatedColumns.map((col) => (
                        <Th key={col.key as string} bordered={bordered} style={{ width: col.width }}>
                            {renderHead ? renderHead(col) : col.title} {/* ✅ renderHead 적용 */}
                        </Th>
                    ))}
                </tr>
            </Thead>
            <tbody>
                {data?.length > 0 ? (
                    data?.map((row, index) => (
                        <Tr key={index} striped={striped} hoverable={hoverable} onClick={() => onRowClick?.(row)}>
                            {columns.map((col) => (
                                <Td
                                    key={col.key as string}
                                    bordered={bordered}
                                    clickable={col.clickable}
                                    onClick={() => onCellClick?.(row, col.key)}
                                >
                                    {/* renderCell이 있으면 사용, 없으면 기본 데이터 출력 */}
                                    {col.key === "actions" && renderAction // actions 컬럼이면 renderAction 실행
                                        ? renderAction(row)
                                        : renderCell // renderCell이 존재하면 실행
                                          ? renderCell(row, col)
                                          : (row[col.key as keyof T] as React.ReactNode)}{" "}
                                </Td>
                            ))}
                        </Tr>
                    ))
                ) : (
                    <Tr>
                        <Td colSpan={columns.length}>
                            <img src={noData} alt='noData' />
                        </Td>
                    </Tr>
                )}
            </tbody>
        </Table>
    );
};
