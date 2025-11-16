import React from "react";
import Image from "next/image";

export const HeaderComponent: React.FC = () => {
    return (
        <header className="bg-white dark:bg-zinc-900 shadow-md">
            <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
                {/* Site title */}
                <h1 className="text-2xl font-bold text-black dark:text-white">
                    WooDeveloper e-Shop
                </h1>

                <div className="relative w-16 h-16">
                    <Image
                        src="/logo.png"   // place your logo in public/logo.png
                        alt="WooDeveloper Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </header>
    );
};