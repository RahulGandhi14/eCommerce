import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import "./Cart.scss";
import shirtImg from "../../assets/product-imgs/shirt.jpeg";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

export const CartProductCard = () => {

    const [ratings, setRatings] = useState(3);
    const [tempRatings, setTempRatings] = useState(3);

    return (
        <Grid container direction="column" className="cart-item" xs={12}>
            <div className="cart-info">
                <div className="productImg">
                    <img src={shirtImg} alt="product-img"/>
                </div>
                <div className="cart-product-info">
                    <div className="justifiedFlex">
                        <h4 className="textWrap">Highlander</h4>
                        <h4>$ 49</h4>
                    </div>
                    <p>Men slip fit casual shirt</p>
                    <p className="faded">Sold by: RetailNet</p>
                    <Button variant="outlined" className="cartUtilityButtons">Size: 6</Button>&nbsp;&nbsp;
                    <Button variant="outlined" className="cartUtilityButtons">Qty: 1</Button>
                </div>
            </div>
            {window.location.hash.includes('cart') ? (
                <div className="cart-action">
                    <Grid container className="btnGroup">
                        <div className="removeBtn">
                            <Button>Remove</Button>
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
                        <div className="justifiedFlex w100">
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