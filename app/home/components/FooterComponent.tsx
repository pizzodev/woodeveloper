import React from "react";

export const FooterComponent: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-zinc-900 py-6 text-center text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} woodeveloper. Tutti i diritti riservati. (v0.1.0)
        </footer>
    )
}