import { server } from "./server";
import { withErrorHandling } from "@/utills/errorHandler";
import { getURL } from ".";


const AUTH_API = "api/v1/auth"
export const checkAuthStatus = withErrorHandling(async (role) => {
    return server.get(getURL(`${AUTH_API}?${role}`));
});
