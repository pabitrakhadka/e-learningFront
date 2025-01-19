import React from 'react';

const InputComp = ({ label = null, type = "text", className, id, name, onChange, onBlur, value, ...props }) => {
    return (

        <>
            <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor={name}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`${className} w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50`}
                {...props}
            /></>

    );
};

export default InputComp;
