import React from 'react'
import Card from '../../components/utils/Card'
import CardOutline from '../../components/utils/CardOutline'

const Settings = () => {
    return (
        <Card className="p-7">
            <h2 className="text-xl">Change Password</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <CardOutline>
                    <div>
                        <label
                            for="productName"
                            className="text-md font-semibold opacity-80"
                        >
                            Current Password
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
                            for="productName"
                            className="text-md font-semibold opacity-80"
                        >
                            New Password
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
                            for="productName"
                            className="text-md font-semibold opacity-80"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            name="productName"
                            id="productName"
                            className="border-2 p-3 rounded-lg mt-2 block w-full border-bgLight focus-within:outline-none"
                        />
                    </div>
                </CardOutline>
            </div>
        </Card>
    )
}

export default Settings
