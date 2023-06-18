import React, { useMemo } from 'react'
import App from '../../App'
import Table from '../../components/Table'
import Card from '../../components/utils/Card'

const Customers = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Customer Name',
                accessor: 'customerName',
            },
            {
                Header: '#ID',
                accessor: 'customerId',
            },
            {
                Header: 'Spent',
                accessor: 'spent',
            },
            {
                Header: 'Last Ordered',
                accessor: 'lastOrdered',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: (props) => <i class="ri-more-2-fill cursor-pointer"></i>,
                textAlign: 'right',
                thAlign: 'right',
            },
        ],
        []
    )

    const data = useMemo(
        () => [
            {
                customerId: '#42582',
                lastOrdered: '05/09/2021',
                customerName: 'Wade Warren',
                email: 'wadewarren@gmail.com',
                spent: '$523',
            },
            {
                customerId: '#42582',
                lastOrdered: '05/09/2021',
                customerName: 'Wade Warren',
                email: 'wadewarren@gmail.com',
                spent: '$523',
            },
            {
                customerId: '#42582',
                lastOrdered: '05/09/2021',
                customerName: 'Wade Warren',
                email: 'wadewarren@gmail.com',
                spent: '$523',
            },
        ],
        []
    )
    return (
        <App>
            <Card className="mb-7">
                <Table columns={columns} data={data} />
            </Card>
        </App>
    )
}

export default Customers
