import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa"; // Importing icons

// Function to determine the severity based on status code
const getSeverityByStatusCode = (statusCode) => {
    if (statusCode >= 100 && statusCode < 200) return "info";
    if (statusCode >= 200 && statusCode < 300) return "success";
    if (statusCode >= 300 && statusCode < 400) return "warning";
    if (statusCode >= 400 && statusCode < 500) return "error";
    if (statusCode >= 500) return "error";
    return "info";
};

// CustomToast Component
const CustomToast = ({ open, message, statusCode, onClose }) => {
    const severity = getSeverityByStatusCode(statusCode);

    // Tailwind classes based on severity
    const severityClasses = {
        info: "bg-blue-500 text-white",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white",
    };

    // Icons based on severity
    const iconMap = {
        info: <FaInfoCircle />,
        success: <FaCheckCircle />,
        warning: <FaExclamationCircle />,
        error: <FaTimesCircle />,
    };

    // Animation class for smooth fade in and fade out
    const animationClasses = "transition-all duration-500 ease-in-out transform";

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positioning
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{ width: "100%" }}
                className={`${severityClasses[severity]} ${animationClasses} rounded-lg shadow-lg flex items-center`}
            >
                {/* Render the appropriate icon for the severity */}
                {/* <span className="mr-2">{iconMap[severity]}</span> */}
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomToast;
