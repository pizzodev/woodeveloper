"use client";

import React from "react";
import { Mail } from "lucide-react";

export const EmailComponent: React.FC = () => {
    const email = "woodeveloper95@gmail.com";
    const subject = encodeURIComponent("Contatto dal sito");
    const body = encodeURIComponent("Ciao, vorrei informazioni su...");

    return (
        <a
            href={`mailto:${email}?subject=${subject}&body=${body}`}
            className="aspect-square w-full flex flex-col items-center justify-center rounded-2xl bg-black dark:bg-white shadow-lg p-4 hover:scale-105 transition-transform"
        >
            <Mail className="h-12 w-50 text-white dark:text-black mb-2" />
            <span className="text-white dark:text-black text-sm font-medium">Email woodeveloper95@gmail.com</span>
        </a>
    );
};
