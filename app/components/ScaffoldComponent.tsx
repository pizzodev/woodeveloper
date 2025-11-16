import React from "react";
import { HeaderComponent } from "@/app/components/HeaderComponent";
import { FooterComponent } from "@/app/components/FooterComponent";

type ScaffoldComponentProps = {
    body: React.FC;
};

export const ScaffoldComponent: React.FC<ScaffoldComponentProps> = ({ body: Body }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent />
            <main className="flex-1">
                <Body />
            </main>
            <FooterComponent />
        </div>
    );
};
