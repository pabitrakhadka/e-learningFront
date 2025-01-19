import React from 'react';
const IconComp = ({
    type = "button",
    icon = null,
    name = null,
    onClick,
    className = "",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-6 py-2 
                  text-white bg-blue-500 hover:bg-blue-600 
                  rounded-md shadow-md transition-all 
                  duration-200 ease-in-out ${className}`}
        >
            {icon && <span className="text-3xl font-bold text-white">{icon}</span>}
            {name && <span className="font-medium">{name}</span>}
        </button>
    );
};

export default IconComp;
