"use client";

import React, { useEffect, useState } from "react";
import ProductComponent from "@/app/products/components/ProductComponent";
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
const CACHE_DURATION = 1000 * 60 * 60; // 1 ora in ms

export const ProductListComponent: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            // Controlla se c'è cache valida
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setProducts(data);
                    setLoading(false);
                    return;
                }
            }

            // Se non c'è cache valida, recupera da Firestore e Storage
            const col = collection(db, "products");
            const snapshot = await getDocs(col);

            const prods: Product[] = await Promise.all(
                snapshot.docs.map(async doc => {
                    const data = doc.data() as Product;
                    let imageUrl = "";
                    if (data.imagePath) {
                        const storageRef = ref(storage, data.imagePath);
                        imageUrl = await getDownloadURL(storageRef);
                    }
                    return { ...data, imageUrl };
                })
            );

            setProducts(prods);
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ data: prods, timestamp: Date.now() })
            );
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-white">Loading...</p>;

    return (
        <section id="products" className="relative mx-auto max-w-7xl px-6 py-8">
            <h3 className="text-2xl font-bold text-white mb-4">Le mie creazioni</h3>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {products.map(product => (
                    <ProductComponent
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
};