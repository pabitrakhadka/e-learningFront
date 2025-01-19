const ButtonComp = ({
    type = null,
    icon = null,
    name,
    onClick,
    className = "",
    isPositive = true
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                px-4 py-2 rounded-md font-medium focus:outline-none transition-colors duration-300
                ${isPositive ?
                    "bg-green-500 text-white hover:bg-green-600 focus:ring focus:ring-green-300" :
                    "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring focus:ring-gray-300"
                } 
                ${className}`}
        >
            {icon && <span className="icon mr-2 flex items-center">{icon}</span>}
            {name && <span className="button-name">{name}</span>}
        </button>
    );
};

export default ButtonComp;