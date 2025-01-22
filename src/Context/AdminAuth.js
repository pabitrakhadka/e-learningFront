import { checkAuthStatus } from "@/function/checkAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createContext } from "react";

//Create Context
const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (loading) {
            fetchAuthStatus();
        }
    }, [loading]); // Dependency on loading to prevent repeated fetch calls

    // Function to fetch authentication status
    const fetchAuthStatus = async () => {
        try {
            const res = await checkAuthStatus('role=admin');

            console.log("res=", res);
            // API call to check status
            if (res.status === 401) {
                router.push('/admin/login');  // Redirect if user is not authenticated
            } else if (res.status === 200) {

                if (res?.data?.data?.role === "admin") {
                    setAdmin(res?.data?.data)
                    console.log(res?.data?.data);
                    // console.log("admin ",)
                    // setSuperAdmin(res.data?.data);
                }

                // setAdmin(res.data?.data);
            } else {
                router.push("/admin/login");  // Default to login page on error
            }
        } catch (error) {
            console.error("Error fetching auth status:", error);
            setAdmin(null);
        } finally {
            setLoading(false);  // Ensure loading state is always updated
        }
    };

    // Login handler
    const login = (userData) => {
        setAdmin(userData);
        console.log("user data")
        setLoading(false); // Stop loading after user data is set
    };

    // Logout handler
    const logout = () => {
        setAdmin(null);
        setLoading(true);
        router.push("/login");
    };

    return (
        <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    )
}
export default AdminAuthContext;