import React from 'react'

const ImageView = ({ onClick, index, image, title }) => {


    return (

        <div onClick={onClick} key={index} className="relative group overflow-hidden rounded-lg shadow-md">
            <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
                alt={title}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                    <h3 className="text-lg font-semibold">{title ? title : ""}</h3>

                </div>
            </div>
        </div>
    )
}

export default ImageView