// Importing the server and utility functions
import { server } from "./server";
import { getURL } from ".";
import { withErrorHandling } from "@/utills/errorHandler";

const BOOK_API = 'api/v1/ebook';

// API Methods
export const postBook = withErrorHandling(async (data) => {
    return server.post(getURL(BOOK_API), data, {
        'Content-Type': 'multipart/form-data',
    });
});

export const getBook = withErrorHandling(async (params) => {
    return server.get(getURL(`${BOOK_API}?${params}`));
});

export const putBook = withErrorHandling(async (params, data) => {
    const response = await server.put(getURL(`${BOOK_API}?${params}`), data, {
        'Content-Type': 'multipart/form-data',
    });
    return response;
});



export const deleteBook = withErrorHandling(async (params) => {
    return server.delete(getURL(`${BOOK_API}?${params}`));
});