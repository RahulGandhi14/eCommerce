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
                        <h3 className="text-md font-semibold mb-4">
                            Add Images
                        </h3>
                        <div className="border-2 border-dashed border-primary rounded-lg w-full h-72">
                            Hello
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
                    <CardOutline>Hello</CardOutline>
                </div>
            </Card>
        </App>
    )
}

export default AddProduct
