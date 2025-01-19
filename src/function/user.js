import { server } from "./server";
import { withErrorHandling } from "@/utills/errorHandler";
import { getURL } from ".";

const USER_API = "api/v1/user"
// API Functions
export const postUser = withErrorHandling(async (data) => {
    return server.post(getURL(USER_API), data);
});

export const getUser = withErrorHandling(async (params) => {
    return server.get(getURL(`${USER_API}`), params);
});

export const putUser = withErrorHandling(async (params, data) => {
    return server.put(getURL(`${USER_API}?${params}`), data);
});

export const deleteUser = withErrorHandling(async (params) => {
    return server.delete(getURL(`${USER_API}?${params}`));
});