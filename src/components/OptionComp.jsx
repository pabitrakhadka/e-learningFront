import React from 'react';

const OptionComp = ({ keyProp, value, checked, onChange, label, isQuiz = false, isCorrect }) => {
    return (
        <>
            {isQuiz ? (
                <label key={keyProp} className="block bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-blue-100 transition">
                    <input
                        type="radio"
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        className="mr-2"
                    />
                    <span className="font-semibold">{label}</span> {value}
                </label>
            ) : (
                <div
                    className={`p-2 m-1 rounded-lg cursor-pointer transition-colors 
                    ${checked ? (isCorrect ? 'bg-green-300' : 'bg-red-300') : 'bg-gray-200'}`}
                    onClick={onChange}
                >
                    <input
                        type="radio"
                        checked={checked}
                        onChange={onChange}
                        className="mr-2"
                    />
                    {value}
                </div>
            )}
        </>
    );
};

export default OptionComp;
