import React, { useEffect, useState } from 'react';
import { Instance } from '../../axios';
import { orderRequests } from '../../request';
import { isAuthenticated } from '../auth/AuthHelpers';
import CartProductCard from '../Checkout/CartProductCard';
import Loader from '../Loader';
import { arrayBufferToBase64 } from '../util';

const MyOrders = () => {

    const user = isAuthenticated();
    
    const [allProducts, setAllProducts] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(2);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async (param='') => {
        setIsLoading(true);
        let reqUrl = `${orderRequests.Order}?limit=${pageLimit}`

        if(allProducts.length) {
            if(param === 'NEXT') {
                let lastDocument = allProducts[allProducts.length-1]._id;
                reqUrl += `&lastDocument=${lastDocument}&param=${param}`;
                setPageNumber(prevPageNumber => prevPageNumber + pageLimit);
            } else if(param === 'PREV'){
                let lastDocument = allProducts[0]._id;
                reqUrl += `&lastDocument=${lastDocument}&param=${param}`;
                setPageNumber(prevPageNumber => prevPageNumber - pageLimit);
            }
        }

        let result = await Instance.get(reqUrl, {
            headers: {
                'Authorization': user.token,
            }
        }).catch(error => {
            if(error.response){
                setIsLoading(false);
                console.log("--->Error",error)
            }
        });
        if(result && result.data) {
            setTotalOrders(result.data.data.count)
            let orders = result.data.data.allOrders.map((order)=>{
                let productArr = order.products.map((product)=>{
                    [1,2,3,4,5].map((index)=>{
                        if(product.product[`img${index}`]) {
                            product.product[`img${index}`] = arrayBufferToBase64(product.product[`img${index}`]?.data?.data);
                        }
                    });
                    product.product.qty = product.qty;
                    product.product.selectedSize = product.size.size;
                    return product;
                });
                order.products = productArr;
                return order
            })
            setAllProducts(orders);
        }
        setIsLoading(false)
    }

    return (
        <>
            <p>Showing <span className="fw500">All Orders</span></p>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {allProducts.map((order)=>(
                        <div className="order-container mb20">
                            <p># {order._id}</p>
                            {order.products.map(product => (
                                <CartProductCard data={product.product} product={product} status={order.status}/>
                            ))}
                        </div>
                    ))}
                    <div className="text-center">
                        {pageNumber>1 && (
                            <>
                                <span 
                                    className="cursorPointer activeLink"
                                    onClick={()=>getAllOrders('PREV')}
                                >&lt;Prev</span>&nbsp;&nbsp;&nbsp;
                            </>
                        )}

                        <span 
                            className="pagination"
                        >Showing {pageNumber} - {pageNumber+(pageLimit-1)}&nbsp; of &nbsp;{totalOrders}
                        </span>&nbsp;&nbsp;&nbsp;

                        {pageNumber+pageLimit<totalOrders && (
                            <span 
                                className="cursorPointer activeLink"
                                onClick={()=>getAllOrders('NEXT')}
                            >Next&gt;</span>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default MyOrders
