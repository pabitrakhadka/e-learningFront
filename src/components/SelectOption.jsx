import React from 'react';

const SelectOption = ({
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    className = "",
    placeholder = "Select an Option"
}) => {
    return (
        <div className={`relative ${className}`}>
            <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <Option key={option.id} value={option.id} label={option.name} />
                ))}
            </select>
        </div>
    );
};

export default SelectOption;

export const Option = ({ value, label }) => {
    return <option value={value}>{label}</option>;
};
