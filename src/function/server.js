import axios from "axios";
import * as Sentry from "@sentry/browser"; // If Sentry is being used for logging

class Server {
    constructor() {
        this.defaultHeaders = { "Content-Type": "application/json" };
        this.axiosInstance = axios.create({
            withCredentials: true,
            baseURL: process.env.PUBLIC_API_URL || "http://localhost:3000",
            timeout: 10000, // 10 seconds timeout
        });
    }

    // Get headers with optional custom headers
    getHeaders(customHeaders = {}) {
        const token = localStorage.getItem("authToken"); // Example for JWT
        return {
            ...this.defaultHeaders,
            ...(token && { Authorization: `Bearer ${token}` }),
            ...customHeaders,
        };
    }

    // Generic request method
    async request(method, path, data = null, customHeaders = {}) {
        const config = {
            method,
            url: path,
            headers: this.getHeaders(customHeaders),
            ...(data && (method === "post" || method === "put") && { data }),
            ...(method === "get" || method === "delete" ? { params: data } : {}),
        };

        try {
            const response = await this.axiosInstance(config);
            return { status: 200, data: response.data }; // Consistent response format
        } catch (error) {
            const status = error?.response?.status || 500;
            const message = error?.response?.data?.message || "Unexpected error occurred";

            console.error(`API Error [${method.toUpperCase()} ${path}]:`, message);
            // Log error to Sentry or other logging services
            Sentry.captureException(error);

            return { status, data: null, error: message }; // Consistent error response format
        }
    }

    post(path, data, customHeaders = {}) {
        return this.request("post", path, data, customHeaders);
    }

    get(path, data, customHeaders = {}) {
        return this.request("get", path, data, customHeaders);
    }

    put(path, data, customHeaders = {}) {
        return this.request("put", path, data, customHeaders);
    }

    delete(path, data, customHeaders = {}) {
        return this.request("delete", path, data, customHeaders);
    }
}

export const server = new Server();
