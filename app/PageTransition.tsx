// app/components/PageTransition.tsx
"use client";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    useEffect(() => {
        // Reset fade-in su nuovo path
        document.documentElement.classList.add('page-transition-ready');
    }, [pathname]);

    return (
        <div className={isPending ? "page-fade-out" : "page-fade-in"}>
            {children}
        </div>
    );
};
