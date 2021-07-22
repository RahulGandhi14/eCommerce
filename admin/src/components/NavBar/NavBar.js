import React from 'react'

const NavBar = () => {
    return (
        <div className="flex justify-between items-center mb-7">
            <h1 className="font-bold text-2xl">Dashboard</h1>
            <div className="bg-white flex p-2 rounded-md cursor-default shadow-sm">
                <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100"
                    alt="Profile"
                    className="rounded-md w-8 h-8 object-cover"
                />
                <div className="leading-none flex flex-col justify-between ml-2">
                    <span>Rahul Gandhi</span>
                    <span className="font-thin text-xs">Seller account</span>
                </div>
                <i className="ri-arrow-down-s-line ml-4 self-center cursor-pointer"></i>
            </div>
        </div>
    )
}

export default NavBar
