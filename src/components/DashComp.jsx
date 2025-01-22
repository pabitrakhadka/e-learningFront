import React from 'react'

const DashComp = ({ key, title, value }) => {
    return (
        <div className='shadow-lg p-3' key={key}>
            <h1 className='font-bold text-3xl '>{title}</h1>
            <h1 className='font-bold text-3xl text-center'>{value}</h1>
        </div>
    )
}

export default DashComp