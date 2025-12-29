// hooks/useAppNavigator.tsx
"use client";

import { useRouter } from "next/navigation";
import { useTransition, useCallback } from "react";

export function useAppNavigator() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const navigate = useCallback((href: string) => {
        startTransition(() => {
            router.push(href);
        });
    }, [router, startTransition]);

    const popBack = useCallback(() => {
        startTransition(() => {
            router.back();
        })
    }, [router, startTransition])

    return { navigate, popBack, isPending };
}
