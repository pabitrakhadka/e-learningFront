import { server } from "./server";
import { withErrorHandling } from "@/utills/errorHandler";
import { getURL } from ".";

const BOOK_API = "api/v1/books"

export const postBook = withErrorHandling(async (data) => {
    const response = await server.post(getURL(BOOK_API), data);
    return response;
});

export const getBook = withErrorHandling(async (params) => {
    const response = await server.get(getURL(`${BOOK_API}?${params}`));
    return response;
});


export const putBook = withErrorHandling(async (params, data) => {
    const response = await server.put(getURL(`${BOOK_API}?${params}`), data);
    return response;
});


export const deleteBook = withErrorHandling(async (params) => {
    const response = await server.delete(getURL(`${BOOK_API}?${params}`));
    return response;
});