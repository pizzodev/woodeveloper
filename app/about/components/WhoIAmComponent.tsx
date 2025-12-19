import React from "react";

export const WhoIAmComponent: React.FC = () => {
    return (
        <section className="relative mx-auto max-w-7xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Chi sono
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-0">
                Sviluppatore software appassionato della lavorazione del legno
            </p>
        </section>
    )
}
