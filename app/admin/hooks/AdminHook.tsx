// useAdminAuth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {authProvider} from "@/app/libs/firebase";

export function useAdminAuth() {
    const [admin, setAdmin] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(authProvider, (user) => {
            setAdmin(user);
            setLoading(false);
        });
        return unsub;
    }, []);

    return { admin, loading };
}
