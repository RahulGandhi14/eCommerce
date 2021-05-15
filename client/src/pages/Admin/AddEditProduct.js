import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid, TextField } from '@material-ui/core'
import './Admin.scss'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from '../NavigationBar/NavBar'
import { Instance } from '../../axios'
import { productRequests } from '../../request'
import { isAuthenticated } from '../auth/AuthHelpers'
import { useHistory } from 'react-router'

const AddEditProduct = () => {
    const classes = useStyles()
    const user = isAuthenticated()

    useEffect(() => {
        if (user?.role !== 1) {
            //
        }
    }, [])

    const img1 = useRef(null)
    const img2 = useRef(null)
    const img3 = useRef(null)
    const img4 = useRef(null)
    const img5 = useRef(null)

    const [images, setImages] = useState({
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
    })
    const [imageUrls, setImagesUrls] = useState({
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
    })

    const [productDetails, setProductDetails] = useState({
        brandName: '',
        productName: '',
        description: '',
        sellingPrice: '',
        mrp: '',
    })
    const [availableSizes, setAvailableSizes] = useState([
        {
            size: '',
            inventory: '',
        },
    ])

    const handleProductDetailsInputs = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        })
    }

    const loadFiles = (e) => {
        setImagesUrls({
            ...imageUrls,
            [e.target.id]: URL.createObjectURL(
                e.target.files[0] ? e.target.files[0] : ''
            ),
        })
        setImages({
            ...images,
            [e.target.id]: e.target.files[0],
        })
    }

    const removeImage = (param) => {
        setImagesUrls({
            ...imageUrls,
            [param]: '',
        })
        setImages({
            ...images,
            [param]: '',
        })
    }

    const addSize = () => {
        if (availableSizes.length <= 3)
            setAvailableSizes([...availableSizes, { size: '', inventory: '' }])
    }

    const handleSizeInputs = (e, idx) => {
        let arr = [...availableSizes]
        arr[idx][e.target.name] = e.target.value
        setAvailableSizes(arr)
    }

    const submitProductDetails = async () => {
        let formData = new FormData()
        Object.keys(productDetails).map((key) =>
            formData.set(key, productDetails[key])
        )
        Object.keys(images).map((key) => formData.set(key, images[key]))
        formData.set('sizes', JSON.stringify(availableSizes))
        let result = await Instance.post(productRequests.product, formData, {
            headers: {
                Authorization: user.token,
            },
        }).catch((error) => {
            if (error.response) {
                console.log('--->Error', error)
            }
        })

        if (result && result.data) {
            //
        }
    }

    return (
        <>
            <h4>Add Product</h4>
            <div>
                <Grid container direction="row" justify="space-between">
                    <Grid xs={5}>
                        <TextField
                            margin="normal"
                            name="brandName"
                            value={productDetails.brandName}
                            onChange={handleProductDetailsInputs}
                            fullWidth
                            label="Brand Name"
                        />
                    </Grid>
                    <Grid xs={5}>
                        <TextField
                            margin="normal"
                            name="productName"
                            value={productDetails.productName}
                            onChange={handleProductDetailsInputs}
                            fullWidth
                            label="Product Name"
                        />
                    </Grid>
                </Grid>

                <TextField
                    margin="normal"
                    name="description"
                    value={productDetails.description}
                    onChange={handleProductDetailsInputs}
                    fullWidth
                    multiline
                    label="Description"
                />

                <div className="add-new-imgs justifiedFlex">
                    <input
                        style={{ display: 'none' }}
                        id="img1"
                        type="file"
                        accept="image/"
                        onChange={loadFiles}
                        ref={img1}
                    />
                    <input
                        style={{ display: 'none' }}
                        id="img2"
                        type="file"
                        accept="image/"
                        onChange={loadFiles}
                        ref={img2}
                    />
                    <input
                        style={{ display: 'none' }}
                        id="img3"
                        type="file"
                        accept="image/"
                        onChange={loadFiles}
                        ref={img3}
                    />
                    <input
                        style={{ display: 'none' }}
                        id="img4"
                        type="file"
                        accept="image/"
                        onChange={loadFiles}
                        ref={img4}
                    />
                    <input
                        style={{ display: 'none' }}
                        id="img5"
                        type="file"
                        accept="image/"
                        onChange={loadFiles}
                        ref={img5}
                    />
                    <div className="addImage cursorPointer">
                        {imageUrls.img1 && (
                            <CloseIcon
                                className="closeBtn"
                                onClick={(e) => removeImage('img1')}
                            />
                        )}
                        {imageUrls.img1 ? (
                            <img
                                alt="product-images"
                                id="image1"
                                src={imageUrls.img1}
                            />
                        ) : (
                            <div onClick={() => img1.current.click()}>
                                <AddAPhotoIcon className="addImageIcon" />
                            </div>
                        )}
                    </div>
                    <div className="addImage cursorPointer">
                        {imageUrls.img2 && (
                            <CloseIcon
                                className="closeBtn"
                                onClick={(e) => removeImage('img2')}
                            />
                        )}
                        {imageUrls.img2 ? (
                            <img
                                alt="product-images"
                                id="image2"
                                src={imageUrls.img2}
                            />
                        ) : (
                            <div onClick={() => img2.current.click()}>
                                <AddAPhotoIcon className="addImageIcon" />
                            </div>
                        )}
                    </div>
                    <div className="addImage cursorPointer">
                        {imageUrls.img3 && (
                            <CloseIcon
                                className="closeBtn"
                                onClick={(e) => removeImage('img3')}
                            />
                        )}
                        {imageUrls.img3 ? (
                            <img
                                alt="product-images"
                                id="image3"
                                src={imageUrls.img3}
                            />
                        ) : (
                            <div onClick={() => img3.current.click()}>
                                <AddAPhotoIcon className="addImageIcon" />
                            </div>
                        )}
                    </div>
                    <div className="addImage cursorPointer">
                        {imageUrls.img4 && (
                            <CloseIcon
                                className="closeBtn"
                                onClick={(e) => removeImage('img4')}
                            />
                        )}
                        {imageUrls.img4 ? (
                            <img
                                alt="product-images"
                                id="image4"
                                src={imageUrls.img4}
                            />
                        ) : (
                            <div onClick={() => img4.current.click()}>
                                <AddAPhotoIcon className="addImageIcon" />
                            </div>
                        )}
                    </div>
                    <div className="addImage cursorPointer">
                        {imageUrls.img5 && (
                            <CloseIcon
                                className="closeBtn"
                                onClick={(e) => removeImage('img5')}
                            />
                        )}
                        {imageUrls.img5 ? (
                            <img
                                alt="product-images"
                                id="image5"
                                src={imageUrls.img5}
                            />
                        ) : (
                            <div onClick={() => img5.current.click()}>
                                <AddAPhotoIcon className="addImageIcon" />
                            </div>
                        )}
                    </div>
                </div>
                <Grid container direction="row" justify="space-between">
                    <Grid xs={5}>
                        <TextField
                            type="number"
                            margin="normal"
                            name="sellingPrice"
                            value={productDetails.sellingPrice}
                            onChange={handleProductDetailsInputs}
                            fullWidth
                            label="Selling Price"
                        />
                    </Grid>
                    <Grid xs={5}>
                        <TextField
                            type="number"
                            margin="normal"
                            name="mrp"
                            value={productDetails.mrp}
                            onChange={handleProductDetailsInputs}
                            fullWidth
                            label="MRP"
                        />
                    </Grid>
                </Grid>
                <div className="marginTopBottom">
                    <h4 className="mb10">Available Sizes</h4>
                    <Button variant="outlined" className="" onClick={addSize}>
                        Add Size
                    </Button>
                    <Grid container direction="row" justify="space-between">
                        {availableSizes.map((availableSize, index) => (
                            <Grid
                                key={`size-${index}`}
                                container
                                direction="row"
                                justify="space-between"
                                xs={5}
                            >
                                <Grid item xs={5}>
                                    <TextField
                                        margin="normal"
                                        name="size"
                                        value={availableSize.size}
                                        label="Size"
                                        onChange={(e) =>
                                            handleSizeInputs(e, index)
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        type="number"
                                        margin="normal"
                                        name="inventory"
                                        value={availableSize.inventory}
                                        label="Inventory"
                                        onChange={(e) =>
                                            handleSizeInputs(e, index)
                                        }
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        className="my10"
                    >
                        <Button
                            variant="contained"
                            className={classes.btnStyle}
                            onClick={submitProductDetails}
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default AddEditProduct
