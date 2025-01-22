import React, { useContext, useState } from "react";
import Link from "next/link";

import { Book, Home, MessageCircle, Image } from "iconsax-react";
import { FaFilePdf, FaNewspaper, FaMessage, FaImage, FaCarBurst } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { useToast } from "@/Context/TostContext";
import AdminAuthContext from "@/Context/AdminAuth";

// import { logoutUser } from "@/functions/admin";
import dynamic from "next/dynamic";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { capitalName } from "@/utills/fullName";
import CheckAdminLogin from "./CheckAdminLogin";
import { Logout } from "@/function/logout";

const DashLayout = ({ children }) => {
    const Loders = dynamic(() => import("@/Components/Loders"), { ssr: false })
    // const { admin, loading, logout } = useContext(AdminAuthContext);
    const { admin, loading, logout } = useContext(AdminAuthContext);

    if (loading) return <Loders />;
    if (!admin) return <CheckAdminLogin />;

    const { showToast } = useToast();

    const logoutButton = async () => {
        console.log("logout button", admin);
        try {
            const res = await Logout(`role=admin&id=${admin?.id}`)
            if (res.status === 200) {
                console.log("daaa=", res.data);
                // console.log("logout success", res.data.message);

                showToast(res.status, res.data.message);
                setTimeout(() => {
                    logout();
                }, 1000);
            } else {
                console.log("logout failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };
    const dashMenu = [
        { name: "Home", to: "/admin", icon: <FaHome size="24" /> },
        { name: "E-Book", to: "/admin/book", icon: <FaNewspaper size="24" /> },

        { name: "Notice", to: "/admin/notice", icon: <FaNewspaper size="24" /> },

        { name: "News", to: "/admin/news", icon: <FaNewspaper size="24" /> },
        { name: "Category", to: "/admin/category", icon: <FaCarBurst size="24" /> },
        { name: "Messages", to: "/admin/message", icon: <FaMessage size="24" /> },
        { name: "Users", to: "/admin/users", icon: <FaUserCircle size="24" /> },

        { name: "Slider", to: "/admin/images", icon: <FaImage size="24" /> },
        { name: "Setting", to: "/admin/setting", icon: <FaImage size="24" /> },

    ];

    return (

        <div className="h-screen flex flex-col bg-gray-50">
            {/* Top Bar */}
            <div className="h-16 bg-blue-500 flex items-center justify-between px-6 shadow-md">
                <div className="text-white font-bold text-xl">Admin Dashboard</div>
                <div className="flex space-x-4">
                    {
                        admin?.id ? <>
                            <div className="relative text-slate-900">
                                {/* Button */}
                                <h1 className="font-extrabold text-white">Hello, {capitalName(admin?.name)}</h1>


                                {/* Popover */}

                            </div></> : <>
                            <li className="px-4 py-2 rounded-md hover:bg-blue-100">
                                <Link className="text-gray-800 hover:text-blue-600" href="/login">Login</Link>
                            </li>
                        </>
                    }
                    <button className="text-white hover:text-blue-200">Notifications</button>
                    <button onClick={logoutButton} className="text-white hover:text-blue-200">Logout</button>
                </div>
            </div>

            <div className="flex flex-grow overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-1/5 bg-blue-700 text-white p-4 overflow-y-auto">
                    <aside>
                        <h2 className="text-xl font-semibold mb-4 border-b border-blue-600 pb-2">
                            Dashboard Menu
                        </h2>
                        <ul className="space-y-3">
                            {dashMenu.map((menu, index) => (
                                <li key={index}>
                                    <Link
                                        href={menu.to}
                                        className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded transition duration-300 ease-in-out"
                                    >
                                        {menu.icon && <span className="text-lg">{menu.icon}</span>}
                                        <span className="text-sm">{menu.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>

                {/* Main Content */}
                <div className="flex-grow bg-gray-100 p-1 overflow-y-auto">
                    <div className="bg-white shadow rounded p-1 min-h-screen">
                        {children}
                    </div>
                    <footer className="mt-6 bg-gray-200 text-gray-700 p-4 text-center rounded">
                        © 2023 Your Company
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default DashLayout;
