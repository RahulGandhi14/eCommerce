import React, { useMemo } from 'react'
import App from '../../App'
import Table from '../../components/Table'
import Card from '../../components/utils/Card'
import StatusCell from '../../components/utils/StatusCell'

const Orders = () => {
    const columns = useMemo(
        () => [
            {
                Header: '#Order No.',
                accessor: 'orderId',
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
                Header: 'Email',
                accessor: 'email',
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

    const data = useMemo(
        () => [
            {
                orderId: '#42582',
                date: '05/09/2021',
                customerName: 'Wade Warren',
                email: 'wadewarren@gmail.com',
                price: '$523',
                status: 'Pending',
            },
            {
                orderId: '#42582',
                date: '05/09/2021',
                customerName: 'Wade Warren',
                email: 'wadewarren@gmail.com',
                price: '$523',
                status: 'Delivered',
            },
            {
                orderId: '#42582',
                date: '05/09/2021',
                customerName: 'Wade Warren',
                email: 'wadewarren@gmail.com',
                price: '$523',
                status: 'Canceled',
            },
        ],
        []
    )

    return (
        <App>
            <Card className="mb-7 flex justify-end"></Card>
            <Card className="mb-7">
                <Table data={data} columns={columns} />
            </Card>
        </App>
    )
}

export default Orders
