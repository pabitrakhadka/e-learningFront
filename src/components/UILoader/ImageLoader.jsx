import React from 'react';

const ImageLoader = ({ width = '100%', height = '200px', borderRadius = '0.5rem' }) => {
    return (
        <div
            className={`bg-gray-300 animate-pulse`}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
            }}
        ></div>
    );
};

export default ImageLoader;
