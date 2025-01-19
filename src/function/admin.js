import { server } from "./server";
import { withErrorHandling } from "@/utills/errorHandler";

import { getURL } from ".";
const ADMIN_API = "api/v1/admin"

export const postAdmin = withErrorHandling(async (data) => {
    return server.post(getURL(ADMIN_API), data);

});

export const getAdmin = withErrorHandling(async (params) => {
    return server.get(getURL(`${ADMIN_API}?${params}`));

});


export const putAdmin = withErrorHandling(async (params, data) => {
    return server.put(getURL(`${ADMIN_API}?${params}`), data);

});


export const deleteAdmin = withErrorHandling(async (params) => {
    return server.delete(getURL(`${ADMIN_API}?${params}`));


});