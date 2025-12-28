"use client";

import React, { useEffect, useState } from "react";
import ProductComponent from "@/app/products/list/components/ProductComponent";
import { db, storage } from "@/app/libs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

interface Product {
    id: string;
    name: string;
    price: number;
    imagePath: string;
    imageUrl: string;
}

const CACHE_KEY = "cachedProducts";
const CACHE_DURATION = 1000 * 60; // 1 minuto in ms
const PLACEHOLDER = "/logo-sold-out.png"; // percorso nella cartella public

export const ProductListComponent: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            // Controlla cache
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setProducts(data);
                    setLoading(false);
                    return;
                }
            }

            // Recupera prodotti da Firestore
            const col = collection(db, "products");
            const snapshot = await getDocs(col);

            const prods: Product[] = await Promise.all(
                snapshot.docs.map(async doc => {
                    const data = doc.data() as Product;
                    let imageUrl = PLACEHOLDER;

                    if (data.imagePath) {
                        try {
                            const storageRef = ref(storage, data.imagePath);
                            imageUrl = await getDownloadURL(storageRef);
                        } catch (err) {
                            imageUrl = PLACEHOLDER;
                        }
                    }

                    return { ...data, imageUrl };
                })
            );

            setProducts(prods);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: prods, timestamp: Date.now() }));
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (loading) {
        const skeletons = Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-700 animate-pulse rounded-lg overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-600 w-full" />
                <div className="p-4 flex flex-col flex-1">
                    <div className="h-5 bg-gray-500 rounded mb-2 w-3/4"></div>
                    <div className="h-5 bg-gray-500 rounded w-1/2"></div>
                </div>
            </div>
        ));

        return (
            <section id="products" className="relative mx-auto max-w-7xl px-6 py-8">
                <h3 className="text-2xl font-bold text-white mb-4">Le mie creazioni</h3>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    {skeletons}
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="relative mx-auto max-w-7xl px-6 py-8">
            <h3 className="text-2xl font-bold text-white mb-4">Le mie creazioni</h3>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {products.map(product => (
                    <ProductComponent
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
};