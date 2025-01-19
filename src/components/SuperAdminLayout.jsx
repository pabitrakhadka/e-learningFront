import React, { useContext, useState } from "react";
import Link from "next/link";
import { FaHome, FaBook, FaChartBar, FaDollarSign, FaFilePdf, FaUsers, FaCogs } from 'react-icons/fa';
import { MdSettings, MdMessage } from 'react-icons/md';
import { IoMdColorPalette } from 'react-icons/io';
import { Book, Home, MessageCircle, Image } from "iconsax-react";
// import { FaFilePdf, FaNewspaper } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { useToast } from "@/Context/TostContext";
import AdminAuthContext from "@/Context/AdminAuth";
import CheckAdminLogin from "./CheckAdminLogin";
import ButtonComp from "./ButtonComp";
import ProfileCard from "./User/ProfileCard";
import { capitalName, fullName } from "@/utills/fullName"
import { logoutUser } from "@/function/logout";
import SuperAdminAuthContext from "@/Context/SuperAdminAuth";
import CheckSuperAdminLogin from "./CheckSuperAdminLogin";
import dynamic from "next/dynamic";
const DashLayout = ({ children }) => {
    const Loders = dynamic(() => import("@/Components/Loders"), { ssr: false });

    // const { admin, loading, logout } = useContext(AdminAuthContext);
    const { superadmin, logout, isLoading } = useContext(SuperAdminAuthContext);

    if (isLoading) return <Loders />;
    if (!superadmin) return <CheckSuperAdminLogin />;

    const { showToast } = useToast();

    const logoutButton = async () => {
        console.log("logout button", superadmin);
        try {
            const res = await logoutUser(`role=admin&id=${superadmin?.id}`)
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
        { name: "Home", to: "/superadmin/", icon: <FaHome size="24" /> },
        { name: "Admin", to: "/superadmin/admins", icon: <FaBook size="24" /> },
        { name: "Analysis", to: "/superadmin/analytics", icon: <FaChartBar size="24" /> },
        { name: "News", to: "/superadmin/subjective", icon: <IoMdColorPalette size="24" /> },
        { name: "Users", to: "/superadmin/users", icon: <FaUsers size="24" /> },
        { name: "Users Manage", to: "/superadmin/usermanage", icon: <FaUsers size="24" /> },
        { name: "Setting", to: "/superadmin/setting", icon: <MdSettings size="24" /> },
    ];

    return (

        <div className="h-screen flex flex-col bg-gray-50">
            {/* Top Bar */}
            <div className="h-16 bg-blue-500 flex items-center justify-between px-6 shadow-md">
                <div className="text-white font-bold text-xl">Super Admin Dashboard</div>
                <div className="flex space-x-4">
                    {
                        superadmin?.id ? <>
                            <div className="relative text-slate-900">
                                {/* Button */}
                                <h1 className="font-extrabold text-white">Hello, {capitalName(superadmin?.name, "")}</h1>
                                {/* Popover */}

                            </div></> : <>

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
                <div className="flex-grow bg-gray-100 p-1 overflow-y-auto w-1/2">
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
