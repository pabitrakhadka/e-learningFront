import React, { useState } from "react";

const SliderImage = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full">
            {/* Carousel container */}
            <div className="relative h-72   overflow-hidden rounded-lg   ">
                {images.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item?.fileUrl}`}
                            alt={`Slide ${index + 1}`}
                            className="block w-full h-full object-cover" // Ensures images cover the container proportionally
                        />
                    </div>
                ))}
            </div>

            {/* Dots navigation */}
            <div className="absolute z-30 flex justify-center space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex
                            ? "bg-black"
                            : "bg-gray-300 hover:bg-gray-500"
                            }`}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Previous button */}
            <button
                type="button"
                onClick={handlePrev}
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 bg-white/30 rounded-full group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </span>
            </button>

            {/* Next button */}
            <button
                type="button"
                onClick={handleNext}
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 bg-white/30 rounded-full group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default SliderImage;
