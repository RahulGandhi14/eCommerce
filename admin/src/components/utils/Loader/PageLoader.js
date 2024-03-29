import React from 'react'
import classes from './PageLoader.module.css'

const PageLoader = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className={classes.loader}></div>
        </div>
    )
}

export default PageLoader
