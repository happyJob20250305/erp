import { Table, Td, Th, Thead, Tr } from "./styled";

export interface Column<T> {
    key: keyof T | "actions";
    title: string;
    clickable?: boolean;
    render?: (value: any) => React.ReactNode;
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
}

export const StyledTable = <T extends { [key: string]: any }>(props: TableProps<T>) => {
    const { columns, data, striped, bordered, hoverable, fullWidth, onCellClick, renderAction } = props;

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
                                    onClick={() => onCellClick?.(row, col.key)}
                                >
                                    {col.key === "actions" && renderAction
                                        ? renderAction(row)
                                        : col.isMoney
                                          ? Number(row[col.key as keyof T]).toLocaleString("ko-KR")
                                          : (row[col.key as keyof T] as React.ReactNode)}
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
