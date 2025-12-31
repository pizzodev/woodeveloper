import { ScaffoldComponent } from "@/app/ScaffoldComponent";
import React from "react";
import { WhoIAmComponent } from "@/app/about/components/WhoIAmComponent";

export default function Home() {
    return (
        <ScaffoldComponent backgroundVideo={"/videos/forest.mp4"}>
            <WhoIAmComponent />
        </ScaffoldComponent>
    );
}