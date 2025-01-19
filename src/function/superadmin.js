import { server } from "./server";
import { withErrorHandling } from "@/utills/errorHandler";
import { getURL } from '.';

const SUPERADMIN_API = "api/v1/superadmin"
export const postSuperAdmin = withErrorHandling(async (data) => {
    const response = await server.post(getURL(SUPERADMIN_API), data);
    return response;
});

export const getSuperAdmin = withErrorHandling(async (params) => {
    const response = await server.get(getURL(`${SUPERADMIN_API}?${params}`));
    return response;
});


export const putSuperAdmin = withErrorHandling(async (params, data) => {
    const response = await server.put(getURL(`${SUPERADMIN_API}?${params}`), data);
    return response;
});


export const deleteSuperAdmin = withErrorHandling(async (params) => {
    const response = await server.delete(getURL(`${SUPERADMIN_API}?${params}`));
    return response;
});