import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import H1 from '../utils/H1'

const NavBar = () => {
    const { isAuthenticated, user, logout } = useAuth0()

    let currentPage = useLocation().pathname.split('/')[1] || ''
    if (currentPage) {
        currentPage =
            currentPage[0].toUpperCase() +
            currentPage.slice(1, currentPage.length)
    }

    return (
        <div className="flex justify-between items-center mb-7">
            <H1>{currentPage}</H1>
            {isAuthenticated ? (
                <div className="bg-white flex p-2 rounded-md cursor-default shadow-sm">
                    <img
                        alt="Profile"
                        className="rounded-md w-8 h-8 object-cover"
                        src={user.picture}
                    />
                    <div className="leading-none flex flex-col justify-between ml-2">
                        <span>{user.nickname}</span>
                        <span className="font-thin text-xs">
                            Seller account
                        </span>
                    </div>
                    <i
                        title="Logout"
                        className="ri-logout-box-r-line ml-4 self-center cursor-pointer"
                        onClick={() =>
                            logout({
                                logoutParams: {
                                    returnTo: window.location.origin,
                                },
                            })
                        }
                    ></i>
                </div>
            ) : null}
        </div>
    )
}

export default NavBar
