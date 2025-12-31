"use client";

import React from "react";
import { InstagramComponent } from "@/app/contacts/components/InstagramComponent";
import { EmailComponent } from "@/app/contacts/components/EmailComponent";

export const ContactsComponent: React.FC = () => {
    return (
        <section className="relative mx-auto max-w-4xl px-6 py-8 flex flex-col items-center text-center space-y-8">
            <h2 className="text-2xl font-black text-white bg-gradient-to-r from-white via-white/90 to-transparent bg-clip-text drop-shadow-lg">
                I miei contatti
            </h2>

            {/* Lista di box */}
            <div className="space-y-8 w-full max-w-2xl">
                {/* Instagram Box */}
                <div className="w-full">
                    <InstagramComponent />
                </div>

                {/* Email Box */}
                <div className="w-full">
                    <EmailComponent />
                </div>
            </div>
        </section>
    );
};
