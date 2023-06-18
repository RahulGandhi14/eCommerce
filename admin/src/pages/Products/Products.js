import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import App from '../../App'
import Table from '../../components/Table'
import Card from '../../components/utils/Card'

const Products = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Product Name',
                accessor: 'productName',
                Cell: (props) => (
                    <div className="flex items-center">
                        <img
                            className="rounded-lg w-10 h-10 object-cover mr-2"
                            src="https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            alt="product"
                        />
                        {props.value}
                    </div>
                ),
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Stock',
                accessor: 'stock',
            },
            {
                Header: 'Sold',
                accessor: 'sold',
            },
            {
                Header: 'Revenue',
                accessor: 'revenue',
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
                productName: 'Watch',
                price: '$1,230',
                stock: 50,
                sold: 10,
                revenue: '$12,300',
            },
            {
                productName: 'Watch',
                price: '$1,230',
                stock: 50,
                sold: 10,
                revenue: '$12,300',
            },
            {
                productName: 'Watch',
                price: '$1,230',
                stock: 50,
                sold: 10,
                revenue: '$12,300',
            },
            {
                productName: 'Watch',
                price: '$1,230',
                stock: 50,
                sold: 10,
                revenue: '$12,300',
            },
            {
                productName: 'Watch',
                price: '$1,230',
                stock: 50,
                sold: 10,
                revenue: '$12,300',
            },
        ],
        []
    )

    return (
        <App>
            <Card className="mb-7 flex justify-end">
                <Link to="/products/add">
                    <button className="bg-primary text-light px-5 py-2 flex items-center rounded-lg">
                        <i class="ri-add-circle-line"></i>&nbsp; Add Product
                    </button>
                </Link>
            </Card>
            <Card className="mb-7">
                <Table data={data} columns={columns} />
            </Card>
        </App>
    )
}

export default Products
