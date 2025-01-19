import React from 'react';

const CheckComp = ({ isChecked, name, value, label, onChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id={name}
                name={name}
                value={value}
                checked={isChecked}
                onChange={onChange}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
        </div>
    );
};

export default CheckComp;
