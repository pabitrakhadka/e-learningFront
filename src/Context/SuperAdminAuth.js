import { checkAuthStatus } from "@/function/checkAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext } from "react";

const SuperAdminAuthContext = createContext();

export const SuperAdminAuthProvider = ({ children }) => { // Fixed typo here
    const [superadmin, setSuperAdmin] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            fetchAuthStatus('role=admin');
        }
    }, [isLoading]);

    const fetchAuthStatus = async () => {
        try {
            const res = await checkAuthStatus("role=admin");

            console.log("responsedata=", res?.data);
            if (res.status === 401) {
                router.push("/superadmin/login");
            } else if (res.status === 200) {


                if (res?.data?.data?.role === "superadmin") {
                    console.log(res.data);
                    setSuperAdmin(res?.data?.data)
                    // setSuperAdmin(res.data?.data);
                }
                // console.log("check super adin,", res?.data?.data.role);
            } else {
                router.push("/superadmin/login");
            }
        } catch (error) {
            console.error("Error fetching auth status:", error);
            setSuperAdmin(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        setSuperAdmin(userData);
        setLoading(false);
    };

    const logout = () => {
        setSuperAdmin(null);
        setLoading(true);
        router.push("/superAdmin");
    };

    return (
        <SuperAdminAuthContext.Provider value={{ superadmin, isLoading, login, logout }}>
            {children}
        </SuperAdminAuthContext.Provider>
    );
};

export default SuperAdminAuthContext;
