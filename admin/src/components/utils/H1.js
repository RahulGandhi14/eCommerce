import React from 'react'

const H1 = (props) => {
    return (
        <h1 className={`text-2xl font-bold ${props.className}`}>
            {props.children}
        </h1>
    )
}

export default H1
