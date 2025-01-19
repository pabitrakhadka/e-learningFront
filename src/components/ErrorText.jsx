import React from 'react'

const ErrorText = ({ text = null }) => {
    return (
        <p className="text-red-500 text-sm mt-1">{text}</p>
    )
}

export default ErrorText