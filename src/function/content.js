// Importing the server and utility functions
import { server } from "./server";
import { getURL } from ".";
import { withErrorHandling } from "@/utills/errorHandler";

const CONTENT_API = 'api/v1/news';

// API Methods
export const postNews = withErrorHandling(async (data) => {
    return server.post(getURL(CONTENT_API), data, {
        'Content-Type': 'multipart/form-data',
    });
});

export const getNews = withErrorHandling(async (params) => {
    return server.get(getURL(`${CONTENT_API}?${params}`));
});

export const putNews = withErrorHandling(async (params, data) => {
    const response = await server.put(getURL(`${CONTENT_API}?${params}`), data, {
        'Content-Type': 'multipart/form-data',
    });
    return response;
});



export const deleteNews = withErrorHandling(async (params) => {
    return server.delete(getURL(`${CONTENT_API}?${params}`));
});