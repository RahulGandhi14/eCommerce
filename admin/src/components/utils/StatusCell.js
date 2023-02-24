import React from 'react'

const StatusCell = (props) => {
    return (
        <div
            className={`${props.value} px-2 py-1 text-center font-semibold rounded-md`}
        >
            {props.value}
        </div>
    )
}

export default StatusCell
