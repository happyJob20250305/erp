import { Table, Td, Th, Thead, Tr } from "./styled";

export interface Column<T> {
    key: keyof T | "actions";
    title: string;
    clickable?: boolean;
    isMoney?: boolean;
}

interface TableProps<T> {
    columns?: Column<T>[];
    data: T[];
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    fullWidth?: boolean;
    onCellClick?: (row: T, column: keyof T) => void;
    renderAction?: (row: T) => React.ReactNode;
    renderAction2?: (row: T) => React.ReactNode; // actions2 핸들러 추가
}

export const MKStyledTable = <T extends { [key: string]: any }>({
    columns,
    data,
    striped,
    bordered,
    hoverable,
    fullWidth,
    onCellClick,
    renderAction2,
    renderAction,
}: TableProps<T>) => {
    const generatedColumns: Column<T>[] =
        columns ??
        (data.length > 0
            ? Object.keys(data[0]).map((key) => ({ key: key as keyof T, title: key, clickable: false }))
            : []);

    if (!generatedColumns.some((col) => col.key === "actions")) {
        generatedColumns.push({ key: "actions", title: "휴직 처리", clickable: false });
    }

    return (
        <Table fullWidth={fullWidth} bordered={bordered}>
            <Thead>
                <tr>
                    {generatedColumns.map((col) => (
                        <Th key={col.key as string} bordered={bordered}>
                            {col.title}
                        </Th>
                    ))}
                </tr>
            </Thead>
            <tbody>
                {data?.length > 0 ? (
                    data?.map((row, index) => (
                        <Tr key={index} striped={striped} hoverable={hoverable}>
                            {generatedColumns.map((col) => (
                                <Td
                                    key={col.key as string}
                                    bordered={bordered}
                                    clickable={col.clickable}
                                    onClick={() => onCellClick?.(row, col.key as keyof T)}
                                >
                                    {col.key === "actions" ? (
                                        renderAction ? (
                                            <span style={{ marginRight: "8px" }}>{renderAction(row)}</span>
                                        ) : null
                                    ) : col.key === "actions2" ? (
                                        renderAction2 ? (
                                            <span>{renderAction2(row)}</span>
                                        ) : null
                                    ) : col.isMoney ? (
                                        Number(row[col.key as keyof T]).toLocaleString("ko-KR")
                                    ) : (
                                        (row[col.key as keyof T] as React.ReactNode)
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))
                ) : (
                    <Tr>
                        <Td colSpan={generatedColumns.length}>조회 내역이 없습니다.</Td>
                    </Tr>
                )}
            </tbody>
        </Table>
    );
};
