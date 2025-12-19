import React from "react";
import Image from "next/image";
import Link from "next/link";

export const HeaderComponent: React.FC = () => {
    return (
        <header className="bg-white dark:bg-zinc-900 shadow-md">
            <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">

                {/* Logo */}
                <div className="relative w-16 h-16">
                    <Image
                        src="/logo.png"
                        alt="WooDeveloper Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Navigation buttons */}
                <nav className="flex items-center gap-4">
                    <Link
                        href={"/about"}
                        className="px-5 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                        Chi sono
                    </Link>

                    <Link
                        href={"/products"}
                        className="px-5 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                        Creazioni
                    </Link>

                    <Link
                        href="/contacts"
                        className="px-5 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-80 transition">
                        Contattami
                    </Link>
                </nav>

            </div>
        </header>
    );
};
