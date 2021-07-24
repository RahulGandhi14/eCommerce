import React from 'react'
import { useTable } from 'react-table'
import './Table.css'

const Table = ({ data, columns, tdClasses = 'px-6 py-4', ...props }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data })

    return (
        <table {...getTableProps()} className="min-w-full border-collapse">
            {props.param !== 'topProducts' && (
                <thead className="bg-primary text-light">
                    {headerGroups.map((headerGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            className="rounded-t-md"
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="px-6 py-4 text-left font-medium tracking-wider"
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
            )}
            <tbody {...getTableBodyProps()} className="bg-white ">
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className={`${tdClasses} whitespace-nowrap`}
                                        style={{
                                            width: cell.column.cellWidth,
                                            textAlign: cell.column.textAlign,
                                        }}
                                    >
                                        {cell.render('Cell')}
                                        {console.log('-->CELL', cell.column)}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
