import React from 'react'
import './SideBar.scss'
import { SideBarData } from './SideBarData'

const SideBar = () => {
    return (
        <div className="min-h-screen w-2/12 bg-white">
            <h1 className="text-2xl text-center pt-7">Ecom</h1>

            <ul className="p-7">
                {SideBarData.map((item, idx) => (
                    <li
                        className={`p-3 mb-2 flex items-center cursor-pointer rounded-lg hover:bg-primary hover:text-light hover:shadow-lg ${
                            idx === 0 && 'active'
                        }`}
                    >
                        {item.icon}
                        <span className="font-semibold">{item.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SideBar
