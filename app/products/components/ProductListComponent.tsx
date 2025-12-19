import React from "react";
import {products} from "@/app/data/products/products";
import ProductComponent from "@/app/products/components/ProductComponent";

export const ProductListComponent: React.FC = () => {
    return (
        <>
            <section id="products" className="relative mx-auto max-w-7xl px-6 py-16">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                    Le mie creazioni
                </h3>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {products.map(product => (
                        <ProductComponent
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.image || ""} // pass imageUrl to image prop
                        />
                    ))}
                </div>
            </section>
        </>
    )
}