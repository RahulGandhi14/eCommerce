import React from 'react'
import Table from '../Table'
import StatusCell from '../utils/StatusCell'

const RecentOrders = () => {
    const data = React.useMemo(
        () => [
            {
                orderNo: '42582',
                date: '05/09/2021',
                customerName: 'Wade Warren',
                price: '$523',
                status: 'Pending',
            },
            {
                orderNo: '42582',
                date: '05/09/2021',
                customerName: 'Wade Warren',
                price: '$523',
                status: 'Delivered',
            },
            {
                orderNo: '42582',
                date: '05/09/2021',
                customerName: 'Wade Warren',
                price: '$523',
                status: 'Canceled',
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: '#Order No.',
                accessor: 'orderNo',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Customer Name',
                accessor: 'customerName',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: (props) => <StatusCell value={props.value} />,
            },
        ],
        []
    )
    return <Table data={data} columns={columns} />
}

export default RecentOrders
