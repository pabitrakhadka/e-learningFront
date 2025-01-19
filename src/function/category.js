import { server } from "./server";
import { getURL } from ".";
import { withErrorHandling } from "@/utills/errorHandler";

const CATEGORY_API = 'api/v1/category';

export const postCategory = withErrorHandling(async (data) => {
    const res = await server.post(getURL(CATEGORY_API), data);
    return res;
})

export const getCategory = withErrorHandling(async (params) => {
    const res = await server.get(getURL(`${CATEGORY_API}?${params}`));
    return res;
})

export const putCategory = withErrorHandling(async (parmas, data) => {
    const res = await server.put(getURL(`${CATEGORY_API}?${parmas}`), data);
    return res;
})

export const deleteCategory = withErrorHandling(async (parmas) => {
    const res = await server.delete(getURL(`${CATEGORY_API}?${parmas}`));
    return res;
})
