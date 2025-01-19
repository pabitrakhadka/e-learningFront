import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const getToastType = (statusCode) => {
    if (statusCode >= 100 && statusCode < 200) return "info";
    if (statusCode >= 200 && statusCode < 300) return "success";
    if (statusCode >= 300 && statusCode < 400) return "warning";
    if (statusCode >= 400 && statusCode < 600) return "error";
    return "info";
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const timeoutRef = useRef(null);

    const showToast = useCallback((statusCode, message) => {
        const id = Date.now();
        const type = getToastType(statusCode);

        // Clear existing timeout before setting a new one
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setToast({ id, message, type });

        timeoutRef.current = setTimeout(() => {
            removeToast();
        }, 5000);
    }, []);

    const removeToast = useCallback(() => {
        setToast(null);

        // Clear the timeout when removing the toast
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Snackbar
                    key={toast.id}
                    open={!!toast}
                    autoHideDuration={5000}
                    onClose={removeToast}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={removeToast}
                        severity={toast.type}
                        sx={{ width: "100%" }}
                        className="rounded-lg shadow-lg flex items-center"
                    >
                        {/* <span className="mr-2">
                            {toast.type === "success" && <FaCheckCircle className="text-xl" />}
                            {toast.type === "info" && <FaInfoCircle className="text-xl" />}
                            {toast.type === "warning" && <FaExclamationCircle className="text-xl" />}
                            {toast.type === "error" && <FaTimesCircle className="text-xl" />}
                        </span> */}
                        {toast.message}
                    </Alert>
                </Snackbar>
            )}
        </ToastContext.Provider>
    );
};
