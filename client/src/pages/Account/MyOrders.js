import React, { useEffect, useState } from 'react'
import { Instance } from '../../axios'
import { orderRequests } from '../../request'
import { isAuthenticated } from '../auth/AuthHelpers'
import CartProductCard from '../Checkout/CartProductCard'
import Loader from '../Loader'
import { arrayBufferToBase64, resError } from '../util'

const MyOrders = () => {
    const user = isAuthenticated()

    const [allProducts, setAllProducts] = useState([])
    const [totalOrders, setTotalOrders] = useState(0)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [pageLimit, setPageLimit] = useState(2)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllOrders()
    }, [])

    const getAllOrders = async (param = '') => {
        setIsLoading(true)
        let reqUrl = `${orderRequests.Order}?`

        if (param === 'NEXT') {
            reqUrl += `page=${currentPageNumber + 1}&limit=${pageLimit}`
            setPageNumber((prevPageNumber) => prevPageNumber + pageLimit)
            setCurrentPageNumber((prev) => prev + 1)
        } else if (param === 'PREV') {
            reqUrl += `page=${currentPageNumber - 1}&limit=${pageLimit}`
            setPageNumber((prevPageNumber) => prevPageNumber - pageLimit)
            setCurrentPageNumber((prev) => prev - 1)
        }

        let result = await Instance.get(reqUrl, {
            headers: {
                Authorization: user.token,
            },
        }).catch((error) => {
            if (error.response) {
                setIsLoading(false)
                resError(error)
            }
        })
        if (result && result.data) {
            setTotalOrders(result.data.data.count)
            let orders = result.data.data.allOrders.map((order) => {
                let productArr = order.products.map((product) => {
                    ;[1, 2, 3, 4, 5].map((index) => {
                        if (product.product[`img${index}`]) {
                            product.product[`img${index}`] =
                                arrayBufferToBase64(
                                    product.product[`img${index}`]?.data?.data
                                )
                        }
                    })
                    product.product.qty = product.qty
                    product.product.selectedSize = product.size.size
                    product.product.ratings = product.ratings
                    product.product.orderItemId = product._id
                    return product
                })
                order.products = productArr
                return order
            })
            setAllProducts(orders)
        }
        setIsLoading(false)
    }

    const rateOrder = async (orderItemId, ratings, indices) => {
        let result = await Instance.post(
            `${orderRequests.Order}/rate`,
            {
                orderItemId,
                ratings,
            },
            {
                headers: {
                    Authorization: user.token,
                },
            }
        ).catch((error) => {
            resError(error)
        })

        if (result && result.data) {
            setAllProducts([])
            let updatedProducts = [...allProducts]
            updatedProducts[indices.orderIdx]['products'][indices.productIdx][
                'ratings'
            ] = ratings
            setAllProducts([...updatedProducts])
        }
    }

    return (
        <>
            <p>
                Showing <span className="fw500">All Orders</span>
            </p>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {allProducts.map((order, orderIdx) => (
                        <div className="order-container mb20">
                            <p># {order._id}</p>
                            {order.products.map((product, productIdx) => (
                                <CartProductCard
                                    data={product.product}
                                    product={product}
                                    status={order.status}
                                    rateOrder={rateOrder}
                                    other={{ orderIdx, productIdx }}
                                    productRatings={product.ratings}
                                />
                            ))}
                        </div>
                    ))}
                    <div className="text-center">
                        {pageNumber > 1 && (
                            <>
                                <span
                                    className="cursorPointer activeLink"
                                    onClick={() => getAllOrders('PREV')}
                                >
                                    &lt;Prev
                                </span>
                                &nbsp;&nbsp;&nbsp;
                            </>
                        )}
                        <span className="pagination">
                            Showing {pageNumber}
                            {pageNumber + (pageLimit - 1) <= totalOrders
                                ? ` - ${pageNumber + (pageLimit - 1)}`
                                : null}
                            &nbsp; of &nbsp;{totalOrders}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        {pageNumber + (pageLimit - 1) < totalOrders && (
                            <span
                                className="cursorPointer activeLink"
                                onClick={() => getAllOrders('NEXT')}
                            >
                                Next&gt;
                            </span>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default MyOrders
