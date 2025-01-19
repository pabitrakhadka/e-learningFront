import React from 'react'
const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

console.log(imageUrl);

const CardNews = ({ image = null, cardTitle = null, isNews = false, description = null, isUserNews = null }) => {
    return (
        <div className="">
            {isNews && (
                <>
                    {image ? (
                        <img
                            className="w-full h-48 object-cover"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}

                            alt="Card Image"
                        />
                    ) : (
                        <img
                            className="w-full h-48 object-cover"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/imagePlace.jpeg`}

                            alt="Card Placeholder"
                        />
                    )}
                    <div className="p-4 flex flex-col h-full justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{cardTitle}</h2>
                            <p className="mt-2 text-gray-600 line-clamp-3 truncate">{description}</p>
                        </div>

                    </div>
                </>
            )}

            {isUserNews ? <>
                {image ? <><img className="w-full h-48 object-cover" src={image} alt="Card Image" /></> : <><img className="w-full h-48 object-cover" src="https://via.placeholder.com/300x200" alt="Card Image" /></>}
                <div className="p-4" >
                    <h2 className="text-xl font-semibold text-gray-800">{cardTitle}</h2>
                    <p className="mt-2 text-gray-600">{description}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Learn More
                    </button>
                </div>
            </> : null}
        </div >

    )
}

export default CardNews