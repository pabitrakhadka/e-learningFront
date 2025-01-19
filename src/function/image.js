import { server } from "./server";
import { getURL } from ".";
import { withErrorHandling } from "@/utills/errorHandler";

const IMAGE_API = 'api/v1/image'

export const postImage = withErrorHandling(async (data) => {
    return server.post(getURL(IMAGE_API), data, {
        'Content-Type': 'multipart/form-data',
    });
});

export const getImage = withErrorHandling(async (params) => {
    return server.get(getURL(`${IMAGE_API}?${params}`));
});

export const putImage = withErrorHandling(async (params, data) => {
    const response = await server.put(getURL(`${IMAGE_API}?${params}`), data, {
        'Content-Type': 'multipart/form-data',
    });
    return response;
});



export const deleteImage = withErrorHandling(async (params) => {
    return server.delete(getURL(`${IMAGE_API}?${params}`));
});