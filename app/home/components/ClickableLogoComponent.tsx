"use client";

import Image from "next/image";
import {useCallback, useEffect, useRef, useState} from "react";
import {navigate} from "next/dist/client/components/segment-cache/navigation";
import {useAppNavigator} from "@/app/AppNavigator";

export function ClickableLogoComponent() {

    const navigator = useAppNavigator()
    const [clicks, setClicks] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSuccess = useCallback(() => {
        navigator.navigate("/admin");
    }, [navigator]);

    const handleClick = () => {
        // Se non c'è un timer attivo, lo avvio (finestra di 2 secondi)
        if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
                // scaduti i 2 secondi: reset conteggio e timer
                setClicks(0);
                timerRef.current = null;
            }, 2000);
        }

        setClicks((prev) => {
            const next = prev + 1;

            if (next >= 5) {

                queueMicrotask(handleSuccess);

                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
                return 0;
            }

            return next;
        });
    };

    return (
        <div onClick={handleClick}>
            <Image
                src="/logo.png"
                alt="WooDeveloper Logo"
                fill
                className="object-contain"
            />
        </div>
    );
}
