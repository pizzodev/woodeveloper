import React from "react";
import {useAdminAuth} from "@/app/admin/hooks/AdminHook";

export const AdminComponent: React.FC = () => {
    const { admin, loading } = useAdminAuth();

    if (!admin) {
        return <div>Loading...</div>
    } else {
        return (
            <section className="relative mx-auto max-w-7xl px-6 py-8 text-center flex flex-col justify-center">
                <p className="text-white dark:text-white-400 mb-0">
                    Admin
                </p>
            </section>
        )
    }
}
