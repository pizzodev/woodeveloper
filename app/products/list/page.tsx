import React from "react";
import {ScaffoldComponent} from "@/app/ScaffoldComponent";
import {ProductListComponent} from "@/app/products/list/components/ProductListComponent";

export default function ProductsPage() {
    return (
        <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
            <ScaffoldComponent backgroundVideo={"../videos/carpenter.mp4"}>
                <ProductListComponent/>
            </ScaffoldComponent>
        </div>
    )
}