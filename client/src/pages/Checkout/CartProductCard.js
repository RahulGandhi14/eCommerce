import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem } from '@material-ui/core';
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
    const [openQtyMenu, setOpenQtyMenu] = useState(false);
    const [openSizeMenu, setOpenSizeMenu] = useState(false);

    //REDUX states
    const cartProducts = useSelector(state => state.cart.cartProducts);

    const removeFromCart = () => {
        let updatedArr = cartProducts.filter((product)=>product._id !== data._id);
        dispatch(addProduct(updatedArr));
    }

    const updateCartDetails = (e, param) => {
        let updatedProductArr = cartProducts.map((product)=>{
            if(product._id !== data._id) return product;
            product[param] = e.target.id;
            return product;
        });
        dispatch(addProduct(updatedProductArr));
        if(param === 'qty') setOpenQtyMenu(false);
        if(param === 'selectedSize') setOpenSizeMenu(false); 
    }

    return (
        <>
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
                        <Button 
                            variant="outlined" 
                            className="cartUtilityButtons"
                            onClick={e=>setOpenSizeMenu(e.currentTarget)}
                        >Size: {data.selectedSize}</Button>&nbsp;&nbsp;
                        {window.location.hash.includes('cart') ? (
                            <Menu
                                anchorEl={openSizeMenu}
                                open={Boolean(openSizeMenu)}
                                keepMounted
                                onClose={()=>setOpenSizeMenu(false)}
                            >
                                {data.sizes.map((size)=>(
                                    <MenuItem id={size.size} onClick={e=>updateCartDetails(e, 'selectedSize')}>{size.size}</MenuItem>
                                ))}
                            </Menu>
                        ) : null}

                        <Button 
                            variant="outlined" 
                            className="cartUtilityButtons" 
                            onClick={(e)=>setOpenQtyMenu(e.currentTarget)}
                        >Qty: {data.qty}</Button>
                        {window.location.hash.includes('cart') ? (
                            <Menu
                                anchorEl={openQtyMenu}
                                open={Boolean(openQtyMenu)}
                                keepMounted
                                onClose={()=>setOpenQtyMenu(false)}
                            >
                                <MenuItem id='1' onClick={(e)=>updateCartDetails(e, 'qty')}>1</MenuItem>
                                <MenuItem id='2' onClick={(e)=>updateCartDetails(e, 'qty')}>2</MenuItem>
                                <MenuItem id='3' onClick={(e)=>updateCartDetails(e, 'qty')}>3</MenuItem>
                                <MenuItem id='4' onClick={(e)=>updateCartDetails(e, 'qty')}>4</MenuItem>
                                <MenuItem id='5' onClick={(e)=>updateCartDetails(e, 'qty')}>5</MenuItem>
                            </Menu>
                        ) : null}
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
        </>
    )
}

export default CartProductCard