"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export const EmailComponent: React.FC = () => {
    const email = "woodeveloper95@gmail.com";
    const subject = encodeURIComponent("Contatto dal sito");
    const body = encodeURIComponent("Ciao, vorrei informazioni su...");

    return (
        <motion.a
            href={`mailto:${email}?subject=${subject}&body=${body}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.4 }}
            className="w-full h-48 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-center text-white gap-4 relative overflow-hidden no-underline"
        >
            {/* BG decorativo */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 -skew-x-12 -translate-x-20 w-[200%] animate-pulse duration-3000" />

            {/* CTA principale */}
            <div className="relative z-10 flex items-center gap-2">
                <Mail className="h-6 w-6" />
                <div>
                    <h3 className="text-sm font-bold">Scrivimi una email</h3>
                </div>
            </div>

            {/* Email con nome */}
            <p className="text-sm font-black tracking-wide opacity-95 relative z-10 break-all">
                woodeveloper95@gmail.com
            </p>

            {/* Link Email */}
            <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30 hover:bg-white/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    Invia email
                    <Mail className="h-3 w-3" />
                </div>
            </motion.div>
        </motion.a>
    );
};
