import React from 'react';

const CardNewsLoader = ({ isNews = false, isUserNews = null }) => {
    return (
        <div className="border rounded shadow-sm overflow-hidden">
            {isNews && (
                <>
                    {/* Image Placeholder */}
                    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    {/* Content Placeholder */}
                    <div className="p-4 flex flex-col justify-between h-full">
                        <div>
                            <div className="h-6 bg-gray-300 rounded mb-4 w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                        </div>
                    </div>
                </>
            )}
            {isUserNews && (
                <>
                    {/* Image Placeholder */}
                    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    {/* Content Placeholder */}
                    <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded mb-4 w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                        <div className="h-10 bg-gray-300 rounded mt-4 animate-pulse"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CardNewsLoader;
