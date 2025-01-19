import React from 'react'

const CardCom = ({ className, children }) => {
    return (
        <div className={`max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>
    )
}

export default CardCom