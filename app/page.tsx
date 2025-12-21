import {ScaffoldComponent} from "@/app/ScaffoldComponent";
import React from "react";
import {WhoIAmComponent} from "@/app/about/components/WhoIAmComponent";

export default function Home() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent backgroundVideo={"/videos/forest.mp4"} body={WhoIAmComponent}/>
        </div>
    );
}