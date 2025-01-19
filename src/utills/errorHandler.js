// src/utils/errorHandler.js
export const withErrorHandling = (asyncFn) => {
    return async (...args) => {
        try {
            return await asyncFn(...args);
        } catch (error) {
            console.error("Error:", error.message);

            if (error.response) {
                const { status, data } = error.response;

                // Specific handling for 401 Unauthorized
                if (status === 401) {
                    console.warn("Unauthorized: Redirecting to login.");
                    // Add logout or redirect logic here if needed
                    return { status, data: null };
                }
                else if (status === 404) {
                    return { status, data: null }
                }

                // Handle other client/server errors
                console.error(`API Error (${status}):`, data?.message || "Unknown error");
                return { status, data };
            }

            // For network or unexpected errors
            console.error("Unexpected Error:", error.message || error);
            return { status: 500, data: null };
        }
    };
};
