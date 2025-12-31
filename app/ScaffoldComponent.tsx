"use client";

import React from "react";
import {HeaderComponent} from "@/app/home/components/HeaderComponent";
import {PageTransition} from "@/app/PageTransition";

type ScaffoldComponentProps = {
    backgroundVideo: string;
    children: React.ReactNode;
};

export const ScaffoldComponent: React.FC<ScaffoldComponentProps> = ({
                                                                        backgroundVideo,
                                                                        children,
                                                                    }) => {
    return (
        <PageTransition>
            <div className="relative min-h-screen">
                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="fixed inset-0 w-full h-full object-cover -z-10"
                >
                    <source src={backgroundVideo} type="video/mp4"/>
                </video>

                {/* Gradient Overlay */}
                <div
                    className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent -z-5 pointer-events-none"/>

                {/* Layout */}
                <div className="flex flex-col min-h-screen relative z-10">
                    <HeaderComponent />

                    <main className="flex-1 flex flex-col">
                        {/* Make this a flex column so children can stretch */}
                        <div className="relative bg-transparent flex flex-col flex-1">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </PageTransition>
    );
};
