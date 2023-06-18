import React from 'react'
import App from '../../App'
import Card from '../../components/utils/Card'
import CardOutline from '../../components/utils/CardOutline'
import H1 from '../../components/utils/H1'

const AddProduct = () => {
    return (
        <App>
            <Card className="p-7">
                <H1>Add Product</H1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <CardOutline>
                        <p className="text-md font-semibold opacity-80 mb-4">
                            Add Images
                        </p>
                        <div className="flex justify-center items-center border-2 border-dashed border-primary rounded-lg w-full h-72">
                            <i className="ri-image-add-line text-9xl cursor-pointer"></i>
                        </div>
                        <div className="mt-4">
                            <div className="border-2 p-2 rounded-lg border-bgLight flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                        alt=""
                                        className="w-10 h-10 rounded-md object-cover mr-2"
                                    />
                                    Navy Blue shoes 01
                                </div>
                                <i class="ri-delete-bin-5-line text-xl cursor-pointer"></i>
                            </div>
                            <div className="border-2 p-2 rounded-lg border-bgLight flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <img
                                        src="https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                        alt=""
                                        className="w-10 h-10 rounded-md object-cover mr-2"
                                    />
                                    Navy Blue shoes 01
                                </div>
                                <i class="ri-delete-bin-5-line text-xl cursor-pointer"></i>
                            </div>
                        </div>
                    </CardOutline>
                    <CardOutline>
                        <div>
                            <label
                                for="productName"
                                className="text-md font-semibold opacity-80"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="productName"
                                id="productName"
                                className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                            />
                        </div>
                        <div>
                            <label
                                for="productDescription"
                                className="text-md font-semibold opacity-80"
                            >
                                Description
                            </label>
                            <textarea
                                type="text"
                                name="productDescription"
                                id="productDescription"
                                className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                            />
                        </div>
                        <div>
                            <label
                                for="productPrice"
                                className="text-md font-semibold opacity-80"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                name="productPrice"
                                id="productPrice"
                                className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                            />
                        </div>
                        <div>
                            <label
                                for="productPrice"
                                className="text-md font-semibold opacity-80"
                            >
                                Sizes
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="size"
                                    className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="quantity"
                                    className="border-2 p-3 rounded-lg mt-2 mb-5 block w-full border-bgLight focus-within:outline-none"
                                />
                            </div>
                        </div>
                    </CardOutline>
                </div>
            </Card>
        </App>
    )
}

export default AddProduct
