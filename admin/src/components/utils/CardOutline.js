import React from 'react'

const CardOutline = (props) => {
    return (
        <div
            className={`border-2 rounded-lg p-7 border-bgLight ${props.className}`}
        >
            {props.children}
        </div>
    )
}

export default CardOutline
