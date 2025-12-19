"use client";

import React from "react";
import { InstagramComponent } from "@/app/contacts/components/InstagramComponent";
import { EmailComponent } from "@/app/contacts/components/EmailComponent";

export const ContactsComponent: React.FC = () => {
    return (
        <section className="relative mx-auto max-w-7xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8">
                I miei contatti
            </h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <div className="aspect-square w-60 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-lg shadow-md">
                    <InstagramComponent />
                </div>
                <div className="aspect-square w-60 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center rounded-lg shadow-md">
                    <EmailComponent />
                </div>
            </div>
        </section>
    );
};
