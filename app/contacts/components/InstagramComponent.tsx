"use client";

import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

export const InstagramComponent: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="w-full h-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center text-white gap-6 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 -skew-x-12 -translate-x-20 w-[200%] animate-pulse-slow" />

            <div className="relative z-10 flex items-center gap-3">
                <Instagram className="h-5 w-5" />
                <div>
                    <h3 className="text-sm font-bold">Scrivimi su Insagram</h3>
                </div>
            </div>

            <p className="text-sm font-black tracking-wider opacity-90 relative z-10">
                @woodeveloper95
            </p>

            {/* Link Instagram */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10"
            >
                <Link
                    href="https://www.instagram.com/woodeveloper95"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30 hover:bg-white/30 hover:shadow-lg transition-all duration-300"
                >
                    Apri Instagram
                    <Instagram className="h-4 w-4" />
                </Link>
            </motion.div>
        </motion.div>
    );
};
