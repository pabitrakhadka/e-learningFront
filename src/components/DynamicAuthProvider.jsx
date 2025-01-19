import React from 'react';
import { UserAuthProvider } from '@/Context/context';
import { AdminAuthProvider } from '@/Context/AdminAuth';
import { SuperAdminAuthProvider } from '@/Context/SuperAdminAuth';

import { useRouter } from 'next/router';

const DynamicAuthProvider = ({ children }) => {
    const router = useRouter();
    const path = router.pathname;

    // Conditionally render the correct provider based on the route
    if (path.startsWith("/admin")) {
        return <AdminAuthProvider>{children}</AdminAuthProvider>;
    } else if (path.startsWith("/superadmin")) {
        return <SuperAdminAuthProvider>{children}</SuperAdminAuthProvider>;
    } else {
        return <UserAuthProvider>{children}</UserAuthProvider>;
    }
};

export default DynamicAuthProvider;
