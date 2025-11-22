import {ScaffoldComponent} from "@/app/components/ScaffoldComponent";
import React from "react";
import HomeComponent from "@/app/components/home/HomeComponent";

export default function Home() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent body={HomeComponent}/>
        </div>
    );
}