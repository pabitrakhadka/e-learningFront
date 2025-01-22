import { useState } from "react";

const ButtonComp = ({
    type = "button",
    icon = null,
    name,
    onClick,
    className = "",
    isPositive = true,
    loadingText = "Processing...",
    defaultText = null,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e) => {
        if (!onClick) return;

        setIsLoading(true);
        try {
            // Ensure onClick can handle async actions
            await onClick(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md font-medium focus:outline-none transition-colors duration-300
                ${isPositive
                    ? "bg-green-500 text-white hover:bg-green-600 focus:ring focus:ring-green-300"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring focus:ring-gray-300"
                } 
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
                ${className}`}
        >
            {isLoading ? (
                <span className="flex items-center">
                    {icon && <span className="icon mr-2">{icon}</span>}
                    {loadingText}
                </span>
            ) : (
                <span className="flex items-center">
                    {icon && <span className="icon mr-2">{icon}</span>}
                    {defaultText || name}
                </span>
            )}
        </button>
    );
};

export default ButtonComp;
