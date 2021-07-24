import React, { useMemo } from 'react'
import Table from '../Table'

const TopProducts = () => {
    const data = useMemo(
        () => [
            {
                productImg:
                    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100',
                productName: 'Watch',
                productPrice: '$120',
            },
            {
                productImg:
                    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100',
                productName: 'Watch',
                productPrice: '$120',
            },
            {
                productImg:
                    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100',
                productName: 'Watch',
                productPrice: '$120',
            },
            {
                productImg:
                    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100',
                productName: 'Watch',
                productPrice: '$120',
            },
        ],
        []
    )
    const columns = useMemo(
        () => [
            {
                Header: '',
                accessor: 'productImg',
                cellWidth: '52px',
                Cell: (props) => (
                    <img
                        className="rounded-md w-9 h-9 object-cover"
                        src={props.value}
                        alt="product"
                    />
                ),
            },
            {
                Header: '',
                accessor: 'productName',
            },
            {
                Header: '',
                cellWidth: '40px',
                textAlign: 'right',
                accessor: 'productPrice',
            },
        ],
        []
    )
    return (
        <Table
            data={data}
            columns={columns}
            param="topProducts"
            tdClasses="px-2 py-1"
        />
    )
}

export default TopProducts
