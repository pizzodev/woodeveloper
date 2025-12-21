import React from "react";
import {HeaderComponent} from "@/app/home/components/HeaderComponent";
import {FooterComponent} from "@/app/home/components/FooterComponent";
import {PageTransition} from "@/app/PageTransition";

type ScaffoldComponentProps = {
    backgroundVideo: string
    body: React.FC;
};

export const ScaffoldComponent: React.FC<ScaffoldComponentProps> = (
    {
        backgroundVideo,
        body: Body
    }
) => {
    return (
        <PageTransition>
            <div className="relative min-h-screen">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="fixed inset-0 w-full h-full object-cover -z-10"
                >
                    <source src={backgroundVideo} type="video/mp4"/>
                </video>

                <div
                    className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent -z-5 pointer-events-none"/>

                {/* Layout */}
                <div className="flex flex-col min-h-screen relative z-10">
                    {/* Header */}
                    <HeaderComponent/>

                    {/* Main content */}
                    <main className="flex-1 lg:pt-28">
                        <div className="relative bg-transparent">
                            <Body/>
                        </div>
                    </main>

                </div>
            </div>
        </PageTransition>
    );
};
