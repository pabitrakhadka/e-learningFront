import React from 'react';

const RadioComp = ({ options, selectedValue, onChange }) => {
    return (
        <div>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        value={option}
                        checked={selectedValue === option}
                        onChange={onChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};

export default RadioComp;
