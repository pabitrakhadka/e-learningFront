import React from "react";

// TextAreaComp component
const TextAreaComp = ({
    value = "",
    name,
    onChange = () => { },
    onBlur = () => { },
    label = "",
    id,
    cols = 10,
    rows = 5,
    placeholder = "",
    ...props
}) => {
    const textAreaId = id || name;

    return (
        <>
            {/* Label for the textarea */}
            {label && (
                <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor={textAreaId}
                >
                    {label}
                </label>
            )}

            {/* Textarea component */}
            <textarea
                id={textAreaId}
                name={name}
                value={value} // Controlled value
                onChange={onChange} // Handle change
                onBlur={onBlur} // Handle blur
                cols={cols}
                rows={rows}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50 resize-none"
                placeholder={placeholder}
                {...props} // Any additional props passed to the component
            />
        </>
    );
};

export default TextAreaComp;
