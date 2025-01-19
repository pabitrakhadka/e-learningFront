import React from 'react';

const FileInputComp = ({ id = '', onChange, className = '', accept = null, name }) => {
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor={`file-upload-${id}`}
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 ${className}`}
                >
                    <div className="flex flex-col items-center justify-center">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16V8m0 0a3 3 0 016 0m6 0v8m-6 4a3 3 0 110-6 3 3 0 010 6z"
                            ></path>
                        </svg>
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">{accept}</p>
                    </div>
                    <input
                        id={`file-upload-${id}`}
                        type="file"
                        className="hidden"
                        accept={accept}
                        name={name}
                        onChange={onChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default FileInputComp;
