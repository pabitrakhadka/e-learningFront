import { server } from "./server";
import { withErrorHandling } from "@/utills/errorHandler";
import { getURL } from ".";

const CONTACT_API = "api/v1/contact"
export const postContact = withErrorHandling(async (data) => {
    return server.post(getURL(CONTACT_API), data);
});

export const getContact = withErrorHandling(async (params) => {
    return server.get(getURL(`${CONTACT_API}?${params}`));
})
// export const putContact = withErrorHandling(async (params, data) => {
//     return server.put(getURL(`${CONTACT_API}?${params}`), data);
// })
export const deleteContact = withErrorHandling(async (params) => {
    return server.delete(getURL(`${CONTACT_API}?${params}`));
})

