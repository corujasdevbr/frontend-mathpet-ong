import React from 'react';
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import  {useAuth}  from "../../hooks/useAuth";
import Topbar from "../../scenes/global/Topbar";
import Sidebar from "../../scenes/global/Sidebar";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const [isSidebar, setIsSidebar] = useState(true);

    if (!user) {
        return <Navigate to="/" />;
    }
 
    return (
        <>
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Outlet />
            </main>
        </>
    )
};