import Compressor from 'compressorjs'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../axios'
import Card from '../../components/utils/Card'
import CardOutline from '../../components/utils/CardOutline'
import H1 from '../../components/utils/H1'

const INITIAL_PRODUCT_STATE = {
    brandName: '',
    productName: '',
    description: '',
    mrp: '',
    sellingPrice: '',
}

const INITIAL_SIZE_STATE = { size: '', inventory: '' }

const MAX_ALLOWED_IMAGES = 5

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [product, setProduct] = useState({
        ...INITIAL_PRODUCT_STATE,
    })

    const [availableSizes, setAvailableSizes] = useState([
        { ...INITIAL_SIZE_STATE },
    ])

    const img = useRef(null)

    const [images, setImages] = useState([])

    const handleProductDetails = (e) =>
        setProduct((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))

    const handleAvailableSizes = (e, idx) =>
        setAvailableSizes((previousState) => {
            const newSizes = [...previousState]
            newSizes[idx][e.target.name] = e.target.value
            return newSizes
        })

    const addNewSize = () =>
        setAvailableSizes((prevState) => [
            ...prevState,
            { ...INITIAL_SIZE_STATE },
        ])

    const loadImages = (e) => {
        if (!e?.target?.files?.length) return

        if (e.target.files.length > MAX_ALLOWED_IMAGES) {
            toast.error(
                `You can select upto ${MAX_ALLOWED_IMAGES} images only!`
            )
            return
        }

        new Array(MAX_ALLOWED_IMAGES).fill(0).forEach((_, idx) => {
            new Compressor(e.target.files[idx], {
                quality: 0.6,
                success: (result) => {
                    setImages((prevState) => [...prevState, result])
                },
            })
        })
    }

    const deleteImage = (idx) => {
        setImages((prevState) => prevState.filter((_, index) => index !== idx))
    }

    const onSave = async () => {
        setIsLoading(true)
        let formData = new FormData()
        Object.keys(product).map((key) => formData.set(key, product[key]))
        images.map((img) => formData.append('img', img))
        formData.set('sizes', JSON.stringify(availableSizes))

        try {
            let result = await axiosInstance.post('/product', formData)
            if (result && result.data) {
                toast.success('Your product has been listed')
                setImages([])
                setAvailableSizes([{ ...INITIAL_SIZE_STATE }])
                setProduct({ ...INITIAL_PRODUCT_STATE })
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error.message)
            }
        } finally {
            formData.delete('img')
            setIsLoading(false)
        }
    }

    return (
        <Card className="p-7">
            <div className="flex justify-between">
                <H1>Add Product</H1>
                <button
                    onClick={onSave}
                    disabled={isLoading}
                    className="bg-primary px-5 py-2 text-light cursor-pointer rounded-lg"
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <CardOutline>
                    <p className="text-md font-semibold opacity-80 mb-2">
                        Add Images
                    </p>
                    <p className="text-xs italic opacity-70 mb-1">
                        You can add upto {MAX_ALLOWED_IMAGES} images.
                    </p>
                    <div className="flex justify-center items-center border-2 border-dashed border-primary rounded-lg w-full h-72">
                        <input
                            id="img"
                            multiple
                            ref={img}
                            type="file"
                            accept="image/"
                            className="hidden"
                            onChange={loadImages}
                            onClick={(e) => (e.target.value = '')}
                        />
                        <i
                            onClick={() => img.current.click()}
                            className="ri-image-add-line text-9xl cursor-pointer"
                        ></i>
                    </div>
                    <div className="mt-4">
                        {images.map((image, idx) => (
                            <div
                                id={`${image.name}_${idx}`}
                                className="border-2 p-2 rounded-lg border-bgLight flex justify-between items-center mb-2 w-full"
                            >
                                <div className="flex items-center gap-2 w-full">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                        className="w-10 h-10 rounded-md object-cover mr-2 cursor-pointer"
                                    />
                                    <p className="truncate" title={image.name}>
                                        {image.name}
                                    </p>
                                    <i
                                        onClick={() => deleteImage(idx)}
                                        class="ri-delete-bin-5-line text-xl cursor-pointer"
                                    ></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardOutline>
                <CardOutline>
                    <div className="flex justify-between gap-3">
                        <div className="basis-1/4">
                            <label
                                for="brandName"
                                className="text-md font-semibold opacity-80"
                            >
                                Brand Name
                            </label>
                            <input
                                type="text"
                                id="brandName"
                                name="brandName"
                                value={product.brandName}
                                onChange={handleProductDetails}
                                className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                for="productName"
                                className="text-md font-semibold opacity-80"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={product.productName}
                                onChange={handleProductDetails}
                                className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            for="description"
                            className="text-md font-semibold opacity-80"
                        >
                            Description
                        </label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleProductDetails}
                            className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                        />
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="w-full">
                            <label
                                for="mrp"
                                className="text-md font-semibold opacity-80"
                            >
                                Price (MRP)
                            </label>
                            <input
                                id="mrp"
                                name="mrp"
                                type="number"
                                value={product.mrp}
                                onChange={handleProductDetails}
                                className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                for="sellingPrice"
                                className="text-md font-semibold opacity-80"
                            >
                                Selling Price
                            </label>
                            <input
                                type="number"
                                id="sellingPrice"
                                name="sellingPrice"
                                value={product.sellingPrice}
                                onChange={handleProductDetails}
                                className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            for="size"
                            className="text-md font-semibold opacity-80"
                        >
                            Sizes
                        </label>
                        <div className="flex flex-col gap-3 pt-2">
                            {availableSizes.map((size, idx) => (
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        name="size"
                                        value={size.size}
                                        placeholder="Size"
                                        onChange={(e) =>
                                            handleAvailableSizes(e, idx)
                                        }
                                        className="border-2 p-3 rounded-lg block w-full border-bgLight focus-within:outline-none"
                                    />
                                    <input
                                        type="number"
                                        name="inventory"
                                        value={size.inventory}
                                        placeholder="Inventory"
                                        onChange={(e) =>
                                            handleAvailableSizes(e, idx)
                                        }
                                        className="border-2 p-3 rounded-lg block w-full border-bgLight focus-within:outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={addNewSize}
                                className="bg-primary-light cursor-pointer text-dark px-3 py-1 mt-2 flex items-center rounded-lg"
                            >
                                <i class="ri-add-circle-line"></i>&nbsp; Add
                                size
                            </button>
                        </div>
                    </div>
                </CardOutline>
            </div>
        </Card>
    )
}

export default AddProduct
