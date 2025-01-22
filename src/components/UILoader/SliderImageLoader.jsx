import React from 'react';

const SliderImageLoader = ({ slideCount = 4, slideWidth = '300px', slideHeight = '200px', gap = '1rem' }) => {
    return (
        <div
            className="flex overflow-x-auto space-x-4 justify-center mt-2"
            style={{
                gap: gap,
            }}
        >
            {Array.from({ length: slideCount }).map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-300 animate-pulse"
                    style={{
                        width: slideWidth,
                        height: slideHeight,
                        borderRadius: '0.5rem',
                        flexShrink: 0,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default SliderImageLoader;
