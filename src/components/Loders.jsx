// import React from 'react';
// import 'ldrs/tailspin';

// const Loders = ({ width = 'w-full', height = 'h-screen', className = '' }) => {
//     return (
//         <div className={`flex items-center justify-center ${width} ${height} ${className}`}>
//             <div className='flex flex-col items-center'>
//                 <l-tailspin
//                     size="40"
//                     stroke="5"
//                     speed="0.9"
//                     color="red"
//                 ></l-tailspin>
//                 <p className='mt-2 text-gray-700'>Loading...</p>
//                 <p className='mt-2 text-gray-700'>Please Wait...</p>
//             </div>
//         </div>
//     );
// };

// export default Loders;
import React, { useEffect, useState } from 'react';

const Loders = ({ width = 'w-full', height = 'h-screen', className = '' }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className={`flex items-center justify-center ${width} ${height} ${className}`}>
            <div className="flex flex-col items-center">
                {isClient && (
                    <l-tailspin
                        size="40"
                        stroke="5"
                        speed="0.9"
                        color="red"
                    />
                )}
                <p className="mt-2 text-gray-700">Loading...</p>
                <p className="mt-2 text-gray-700">Please Wait...</p>
            </div>
        </div>
    );
};

export default Loders;
