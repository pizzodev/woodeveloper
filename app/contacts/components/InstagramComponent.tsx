"use client";

import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export const InstagramComponent: React.FC = () => {
    return (
        <motion.a
            href="https://www.instagram.com/woodeveloper95"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="aspect-square w-full flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg p-4"
        >
            <Instagram className="h-12 w-12 text-white mb-2" />
            <span className="text-white text-sm font-medium">Instagram</span>
            <span className="text-white text-sm font-medium">@woodeveloper95</span>
        </motion.a>
    );
};
