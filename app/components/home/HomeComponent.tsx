"use client";

import React from "react";
import ProductComponent from "@/app/components/products/ProductComponent";
import { WhoIAmComponent } from "@/app/components/home/WhoIAmComponent";
import {products} from "@/app/components/products/data/products";

export default function HomeComponent() {
    //const [products, setProducts] = useState<Product[]>([]);

    /*useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(productsDb, "products"));
                const productsData: Product[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Product, "id">), // type assertion
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);*/

    return (
        <>
            <WhoIAmComponent />
            <section id="products" className="mx-auto max-w-7xl px-6 py-16">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-8">
                    My creations
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
    );
}
