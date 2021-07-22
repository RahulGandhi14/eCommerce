import React from 'react'

const Card = (props) => {
    return (
        <div className={`bg-white shadow-sm rounded-xl p-4 ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Card
