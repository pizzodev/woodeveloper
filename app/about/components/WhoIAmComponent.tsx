"use client";

import React from "react";
import { useAppNavigator } from "@/app/AppNavigator";

export const WhoIAmComponent: React.FC = () => {
    const navigator = useAppNavigator();

    return (
        <section
            className="
                flex flex-col flex-1
                mx-auto max-w-7xl
                px-6 pt-8
                p-8
                text-center
            "
        >
            <div className="pb-8">
                <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
                    Chi sono
                </h2>

                <p className="text-white dark:text-white-400 mb-2">
                    Sono uno sviluppatore software con la passione per la creazione di oggetti
                    artigianali in legno, dove tecnologia e artigianato si incontrano.
                </p>

                <p className="text-white dark:text-white-400 mb-2">
                    Il progetto <strong>WooDeveloper</strong> nasce come hobby, ma rappresenta il
                    mio desiderio di unire creatività, design e cura dei dettagli in ogni cosa che
                    faccio.
                </p>

                <p className="text-white dark:text-white-400">
                    Credo che ogni codice scritto e ogni pezzo di legno lavorato possano raccontare
                    una storia unica, lasciando la mia personale <strong>impronta</strong> in tutto
                    ciò che creo.
                </p>
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    navigator.navigate("/products/list");
                }}
                className="
                    mt-8
                    px-6 py-4
                    rounded-xl
                    border border-zinc-200 dark:border-zinc-700
                    text-base font-semibold
                    text-white dark:text-white
                    hover:bg-zinc-50/10 dark:hover:bg-zinc-800/50
                    transition-all duration-200
                "
            >
                Le mie creazioni
            </button>
        </section>
    );
};