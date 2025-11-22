import React from "react";

export const FooterComponent: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-zinc-900 mt-16 py-6 text-center text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} WooDeveloper. All rights reserved.
        </footer>
    )
}