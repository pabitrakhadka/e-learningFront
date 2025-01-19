import { server } from "./server";
import { withErrorHandling } from "@/utills/errorHandler";
import { getURL } from ".";

const LOGOUT_API = "api/v1/auth/logout"

const USER_API = 'api/v1/user/login';
const SuperAdminLogin = 'api/v1/superadmin/login';

const AdminLogin = 'api/v1/admin/login';
export const userLogin = withErrorHandling(async (data) => {
    return server.post(getURL(`${USER_API}`), data);

});



export const adminiLogin = withErrorHandling(async (data) => {
    return server.post(getURL(`${AdminLogin}`), data);

});



export const superAdminLogin = withErrorHandling(async (params, data) => {
    return server.post(getURL(`${SuperAdminLogin}?${params}`), data);
});
export const Logout = withErrorHandling(async (params) => {
    return server.delete(getURL(`${LOGOUT_API}?${params}`));

});