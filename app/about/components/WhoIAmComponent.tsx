import React from "react";

export const WhoIAmComponent: React.FC = () => {
    return (
        <section className="relative mx-auto max-w-7xl px-6 py-8 text-center flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white dark:text-white mb-4">
                Chi sono
            </h2>
            <p className="text-white dark:text-white-400 mb-2">
                Sono uno sviluppatore software con la passione per la creazione di oggetti artigianali in legno, dove tecnologia e artigianato si incontrano.
            </p>
            <p className="text-white dark:text-white-400 mb-2">
                Il progetto <strong>WooDeveloper</strong> nasce come hobby, ma rappresenta il mio desiderio di unire creatività, design e cura dei dettagli in ogni cosa che faccio.
            </p>
            <p className="text-white dark:text-white-400">
                Credo che ogni codice scritto e ogni pezzo di legno lavorato possano raccontare una storia unica, lasciando la mia personale <strong>impronta</strong> in tutto ciò che creo.
            </p>
        </section>
    )
}
