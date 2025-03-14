import React, { useMemo } from "react";
import { useTable } from "react-table";

// 숫자 포맷팅 함수
const formatNumber = (value: number) => value.toLocaleString();

// 수금 상태 포맷팅 함수
const formatStatus = (value: string) => (value === "Y" ? "수금완료" : "미수금");

interface ReceivablesTableProps {
    data: any[];
    onRowClick: (orderId: number) => void;
}

// React Table 컴포넌트
export const ReceivablesTable: React.FC<ReceivablesTableProps> = ({ data, onRowClick }) => {
    const columns = useMemo(
        () => [
            { Header: "주문번호", accessor: "orderId" },
            { Header: "처리부서", accessor: "departmentName" },
            { Header: "거래처", accessor: "clientName" },
            { Header: "제품명", accessor: "productName" },
            { Header: "수주일자", accessor: "orderDate" },
            { Header: "배송일자", accessor: "deliveryDate" },
            {
                Header: "미수금",
                accessor: "receivableAmount",
                Cell: ({ value }: { value: number }) => formatNumber(value),
            },
            {
                Header: "수금상태",
                accessor: "receivableStatus",
                Cell: ({ value }: { value: string }) => formatStatus(value),
            },
            {
                Header: "처리자",
                accessor: "managerName",
                Cell: ({ value }: { value: string }) => (value ? value : "자동 처리"),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} style={{ background: "#f3f3f3" }}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            onClick={() => onRowClick(row.original.orderId)}
                            style={{ cursor: "pointer" }}
                        >
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                    style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}
                                >
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ReceivablesTable;
