import { Box, Button, Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import NavBar from '../NavigationBar/NavBar'
import { productRequests, wishlistRequests } from '../../request'
import { Instance } from '../../axios'
import { isAuthenticated } from '../auth/AuthHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../redux/actions'
import { toast } from 'react-toastify'
import Loader from '../Loader'

const MessageComponent = ({ image, msg }) => (
    <div className="justifiedFlex rowDir alignCenter">
        <img style={{ height: '60px' }} src={image} alt="notification" />
        <p style={{ color: 'white', marginLeft: '10px' }}>{msg}</p>
    </div>
)

const ProductDetails = ({ match }) => {
    const user = isAuthenticated()
    const dispatch = useDispatch()
    let productId = match.params.productId

    //REDUX states
    const cartProducts = useSelector((state) => state.cart.cartProducts)

    //REACT states
    const [mainImg, setMainImg] = useState('')
    const [images, setImages] = useState([])
    const [selectedSize, setSelectedSize] = useState('')
    const [productDetails, setProductDetails] = useState({})
    const [showError, setShowError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        setIsLoading(true)
        let result = await Instance.get(
            `${productRequests.product}/${productId}`,
            {
                headers: {
                    Authorization: user.token,
                },
            }
        ).catch((error) => {
            if (error.response) {
                setIsLoading(false)
                console.log('--->Error', error)
            }
        })
        if (result && result.data) {
            setMainImg(result.data.data.img1)
            let arr = []
            let keys = [1, 2, 3, 4, 5]
            keys.map((key) => {
                if (result.data.data[`img${key}`]) {
                    arr = [...arr, result.data.data[`img${key}`]]
                    result.data.data[`img${key}`] =
                        result.data.data[`img${key}`]
                }
            })
            setProductDetails(result.data.data)
            setImages(arr)
        }
        setIsLoading(false)
    }

    const productImageSection = () => (
        <>
            <div className="otherImgs">
                {images.map((img) => (
                    <img
                        src={img}
                        alt="img"
                        onMouseOver={() => setMainImg(img)}
                    />
                ))}
            </div>
            <div className="mainImg-container">
                <img className="mainImg" src={mainImg} alt="mainImg" />
            </div>
        </>
    )

    useEffect(() => {
        if (showError) {
            let element = document.getElementById('select-size-msg')
            if (element) {
                if (element.classList.contains('shake-horizontal')) {
                    element.classList.remove('shake-horizontal')
                }
                element.scrollIntoView({ behavior: 'smooth' })
                element.classList.add('shake-horizontal')
            }
        }
    }, [showError])

    const addToCart = () => {
        if (!selectedSize) {
            document
                .getElementById('size-buttons')
                .classList.remove('shake-horizontal')
            setShowError(true)
            setShowError((prevState) => {
                if (prevState) {
                    let element = document.getElementById('select-size-msg')
                    if (element) {
                        if (element.classList.contains('shake-horizontal')) {
                            element.classList.remove('shake-horizontal')
                        }
                        element.scrollIntoView({ behavior: 'smooth' })
                        element.classList.add('shake-horizontal')
                    }
                }
                return prevState
            })
            document
                .getElementById('size-buttons')
                .classList.add('shake-horizontal')
            return
        }
        setShowError(false)
        let updatedArr = []
        let alreadyInCart = false
        updatedArr = cartProducts.map((product) => {
            if (product._id === productDetails._id) {
                product['qty'] += 1
                product['selectedSize'] = selectedSize
                alreadyInCart = true
            }
            return product
        })

        if (!alreadyInCart) {
            updatedArr = [
                ...cartProducts,
                {
                    ...productDetails,
                    selectedSize,
                    qty: 1,
                },
            ]
        }
        dispatch(addProduct(updatedArr))
        toast.dark(
            <MessageComponent
                image={productDetails.img1}
                msg="Added to cart"
            />,
            { position: 'top-right' }
        )
    }

    const addToWishlist = async () => {
        let result = await Instance.post(
            wishlistRequests.wishlist,
            { productId: productDetails._id },
            {
                headers: {
                    Authorization: user.token,
                },
            }
        ).catch((error) => {
            if (error.response) {
                console.log('--->Error', error)
            }
        })

        if (result && result.data) {
            toast.dark(
                <MessageComponent
                    image={productDetails.img1}
                    msg="Added to wishlist"
                />,
                { position: 'top-right' }
            )
        }
    }

    return (
        <>
            <NavBar />
            <Grid container xs={12}>
                <Container>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Box my={5} className="marginButtonDisable">
                            {Object.keys(productDetails).length ? (
                                <Grid container xs={12}>
                                    <Grid
                                        item
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        container
                                        className="product-imgs"
                                    >
                                        {productImageSection()}
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div className="product-details">
                                            <h1>{productDetails?.brandName}</h1>
                                            <h3 className="faded">
                                                {productDetails?.productName}
                                            </h3>
                                            <div className="horizontal-divider"></div>
                                            <h2>
                                                Rs.{' '}
                                                {productDetails?.sellingPrice}{' '}
                                                &nbsp;
                                                <span className="originalPrice">
                                                    (Rs. {productDetails?.mrp})
                                                </span>{' '}
                                                &nbsp;
                                                <span className="discount">
                                                    (
                                                    {Math.round(
                                                        ((productDetails?.mrp -
                                                            productDetails?.sellingPrice) /
                                                            productDetails?.sellingPrice) *
                                                            100
                                                    )}
                                                    % off)
                                                </span>
                                            </h2>

                                            <div className="sizes my20">
                                                <h4
                                                    className="mb8"
                                                    style={{
                                                        fontWeight: '500',
                                                        textTransform:
                                                            'uppercase',
                                                    }}
                                                >
                                                    Select size
                                                </h4>
                                                <div className="size-select">
                                                    {showError && (
                                                        <p
                                                            className="mb8 text-red"
                                                            id="select-size-msg"
                                                        >
                                                            Please select a size
                                                        </p>
                                                    )}
                                                    {productDetails?.sizes?.map(
                                                        (size) => (
                                                            <input
                                                                type="radio"
                                                                id={size.size}
                                                                checked={
                                                                    selectedSize ===
                                                                    size.size
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setSelectedSize(
                                                                        e.target
                                                                            .id
                                                                    )
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                    <div
                                                        className="size-buttons"
                                                        id="size-buttons"
                                                    >
                                                        {productDetails?.sizes.map(
                                                            (size) => (
                                                                <label
                                                                    className={
                                                                        selectedSize ===
                                                                        size.size
                                                                            ? 'selected'
                                                                            : ''
                                                                    }
                                                                    htmlFor={
                                                                        size.size
                                                                    }
                                                                >
                                                                    {size.size}
                                                                </label>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <h4
                                                className="mb8"
                                                style={{
                                                    fontWeight: '500',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                Product Details
                                            </h4>
                                            <p
                                                style={{
                                                    whiteSpace: 'pre-line',
                                                }}
                                            >
                                                {productDetails?.description}
                                            </p>
                                        </div>
                                        <div className="purchase-buttons">
                                            <Button
                                                className="addToCart"
                                                variant="contained"
                                                onClick={addToCart}
                                            >
                                                Add to cart
                                            </Button>
                                            <Button
                                                className="addToWishlist"
                                                variant="outlined"
                                                onClick={addToWishlist}
                                            >
                                                Wishlist
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            ) : null}
                        </Box>
                    )}
                </Container>
            </Grid>
        </>
    )
}

export default ProductDetails
