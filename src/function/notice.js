// Importing the server and utility functions
import { server } from "./server";
import { getURL } from ".";
import { withErrorHandling } from "@/utills/errorHandler";

const NOTICE_API = 'api/v1/notice';

// API Methods
export const postNotice = withErrorHandling(async (data) => {
    return server.post(getURL(NOTICE_API), data,
        {
            'Content-Type': 'multipart/form-data',
        });
});

export const getNotice = withErrorHandling(async (params) => {
    return server.get(getURL(`${NOTICE_API}?${params}`));
});

export const putNotice = withErrorHandling(async (params, data) => {
    return server.put(getURL(`${NOTICE_API}?${params}`), data, {
        'Content-Type': 'multipart/form-data',
    });

});



export const deleteNotice = withErrorHandling(async (params) => {
    return server.delete(getURL(`${NOTICE_API}?${params}`));
});