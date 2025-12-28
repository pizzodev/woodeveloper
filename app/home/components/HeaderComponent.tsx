'use client'

import React, {useState, useEffect, useTransition} from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {ClickableLogoComponent} from "@/app/home/components/ClickableLogoComponent";
import {useAppNavigator} from "@/app/AppNavigator";

export const HeaderComponent: React.FC = () => {
    const navigator = useAppNavigator()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Chiudi menu su resize > md
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header className="bg-black/20 dark:bg-zinc-900/30 backdrop-blur-sm border-b border-white/10 dark:border-zinc-700/50 shadow-xl relative z-50 py-4 px-6">
                <div className="mx-auto max-w-7xl flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <ClickableLogoComponent/>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden flex items-center p-2 rounded-md hover:bg-white/20 dark:hover:bg-zinc-800/50 backdrop-blur-sm transition-all duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>

                    {/* Navigation buttons - Desktop */}
                    <nav className="hidden md:flex items-center gap-4">
                        <Link
                            className="px-5 py-2 rounded-md border border-white/20 dark:border-zinc-700/50 text-sm font-semibold text-white hover:bg-white/20 dark:hover:bg-zinc-800/50 backdrop-blur-sm transition-all duration-200"
                            href={"/about"}
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.navigate("/about");
                            }}
                        >
                            Chi sono
                        </Link>
                        <Link
                            className="px-5 py-2 rounded-md border border-white/20 dark:border-zinc-700/50 text-sm font-semibold text-white hover:bg-white/20 dark:hover:bg-zinc-800/50 backdrop-blur-sm transition-all duration-200"
                            href={"/products"}
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.navigate("/products/list");
                            }}
                        >
                            Creazioni
                        </Link>
                        <Link
                            className="px-5 py-2 rounded-md bg-white/20 dark:bg-zinc-800/50 text-white dark:text-white text-sm font-semibold backdrop-blur-sm border border-white/30 hover:bg-white/30 dark:hover:bg-zinc-700/50 transition-all duration-200"
                            href="/contacts"
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.navigate("/contacts");
                            }}
                        >
                            Contattami
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Mobile menu con animazioni */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Menu pannello */}
                    <div className="fixed top-0 right-0 w-80 h-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl border-l border-zinc-200 dark:border-zinc-700 translate-x-0 transition-all duration-400 ease-out opacity-100 z-50">
                        {/* Header menu */}
                        <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center sticky top-0 bg-inherit">
                            <h3 className="text-lg font-semibold text-black dark:text-white">Menu</h3>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6 text-black dark:text-white" />
                            </button>
                        </div>

                        {/* Nav items con stagger animation */}
                        <nav className="p-6 flex flex-col gap-1 pt-4 overflow-y-auto h-full">
                            <Link
                                href={"/about"}
                                className="group/nav px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-base font-semibold text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 opacity-100 translate-x-0"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Chi sono
                            </Link>
                            <Link
                                href={"/products/list"}
                                className="group/nav px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-base font-semibold text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 opacity-100 translate-x-0"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Creazioni
                            </Link>
                            <Link
                                href="/contacts"
                                className="group/nav px-4 py-4 rounded-xl bg-gradient-to-r from-black to-zinc-900 dark:from-zinc-50 dark:to-white text-white dark:text-black text-base font-semibold border border-zinc-300 dark:border-zinc-600 hover:shadow-lg transition-all duration-200 opacity-100 translate-x-0"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contattami
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};
