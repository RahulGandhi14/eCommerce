import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import "./Cart.scss";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions';

export const CartProductCard = ({data}) => {

    const dispatch = useDispatch();

    //REACT states
    const [ratings, setRatings] = useState(3);
    const [tempRatings, setTempRatings] = useState(3);

    //REDUX states
    const cartProducts = useSelector(state => state.cart.cartProducts);

    const removeFromCart = () => {
        let updatedArr = cartProducts.filter((product)=>product._id !== data._id);
        dispatch(addProduct(updatedArr));
    }

    return (
        <Grid container direction="column" className="cart-item" xs={12}>
            <div className="cart-info">
                <div className="productImg">
                    <img src={data[`img1`]} alt="product-img"/>
                </div>
                <div className="cart-product-info">
                    <div className="justifiedFlex rowDir">
                        <h4 className="textWrap">{data.brandName}</h4>
                        <h4>&#8377; {data.sellingPrice}</h4>
                    </div>
                    <p>{data.productName}</p>
                    <p className="faded">Sold by: RetailNet</p>
                    <Button variant="outlined" className="cartUtilityButtons">Size: {data.selectedSize}</Button>&nbsp;&nbsp;
                    <Button variant="outlined" className="cartUtilityButtons">Qty: {data.qty}</Button>
                </div>
            </div>
            {window.location.hash.includes('cart') ? (
                <div className="cart-action">
                    <Grid container className="btnGroup">
                        <div className="removeBtn">
                            <Button onClick={removeFromCart}>Remove</Button>
                        </div>
                        <div className="divider"></div>
                        <div className="wishlistBtn">
                            <Button>Move to wishlist</Button>
                        </div>
                    </Grid>
                </div>
            ) : (
                <div className="cart-action">
                    <Grid container className="btnGroup">
                        <div className="justifiedFlex w100 rowDir">
                            <div style={{display: "flex"}} onMouseEnter={()=>setTempRatings(0)} onMouseLeave={()=>setTempRatings(ratings)}>
                                {[1,2,3,4,5].map((totalStars)=>(
                                    <div className="cursorPointer" onMouseEnter={()=>setTempRatings(totalStars)} onMouseLeave={()=>setTempRatings(0)}>
                                        {
                                            totalStars <= tempRatings 
                                            ? <StarIcon /> 
                                            : <StarBorderIcon/>
                                        }
                                    </div>
                                ))}
                            </div>
                            <p className="fw500 cursorPointer">Write Review</p>
                        </div>
                    </Grid>
                </div>
            )}
        </Grid>
    )
}

export default CartProductCard