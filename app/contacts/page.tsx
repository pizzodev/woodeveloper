import {ContactsComponent} from "@/app/contacts/components/ContactComponent";
import React from "react";
import {ScaffoldComponent} from "@/app/ScaffoldComponent";

export default function ContactsPage() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent backgroundVideo={"videos/forest_above.mp4"}>
                <ContactsComponent/>
            </ScaffoldComponent>
        </div>
    )
}