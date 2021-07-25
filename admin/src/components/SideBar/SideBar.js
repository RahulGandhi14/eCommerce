import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './SideBar.scss'
import { SideBarData } from './SideBarData'

const SideBar = (props) => {
    let currentPage = props.match.path

    return (
        <div className="h-screen sticky top-0 left-0 w-2/12 bg-white">
            <h1 className="text-2xl text-center pt-7">Ecom</h1>

            <ul className="p-7">
                {SideBarData.map((item, idx) => (
                    <li
                        className={`p-3 mb-2  cursor-pointer rounded-lg ${
                            currentPage.includes(item.title.toLowerCase()) &&
                            'bg-primary text-light shadow-lg'
                        }`}
                    >
                        <Link
                            className="flex items-center"
                            to={`/${item.title.toLowerCase()}`}
                        >
                            {item.icon}
                            <span className="font-semibold">{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default withRouter(SideBar)
