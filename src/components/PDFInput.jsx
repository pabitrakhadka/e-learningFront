import React from "react";

const PDFInput = ({ name, onChange, accept }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                Upload PDF
            </label>
            <input
                id={name}
                name={name}
                type="file"
                accept={accept}
                onChange={onChange}
                className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    );
};

export default PDFInput;
