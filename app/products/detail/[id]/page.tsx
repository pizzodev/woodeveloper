"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db, storage } from "@/app/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    price: number;
    imagePath: string;
    imageUrl: string;
    description?: string;
}

const CACHE_KEY_PREFIX = "product_";
const CACHE_DURATION = 1000 * 60; // 1 minuto
const PLACEHOLDER = "/logo-sold-out.png";

const ProductDetailPage: React.FC = () => {
    const params = useParams(); // Next.js hook per param dinamico
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            // Controlla cache
            const cached = localStorage.getItem(CACHE_KEY_PREFIX + id);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setProduct(data);
                    setLoading(false);
                    return;
                }
            }

            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    setProduct(null);
                    setLoading(false);
                    return;
                }

                const data = docSnap.data() as Product;
                let imageUrl = PLACEHOLDER;

                if (data.imagePath) {
                    try {
                        const storageRef = ref(storage, data.imagePath);
                        imageUrl = await getDownloadURL(storageRef);
                    } catch {
                        imageUrl = PLACEHOLDER;
                    }
                }

                const productData = { ...data, imageUrl };
                setProduct(productData);
                localStorage.setItem(
                    CACHE_KEY_PREFIX + id,
                    JSON.stringify({ data: productData, timestamp: Date.now() })
                );
            } catch (err) {
                console.error(err);
                setProduct(null);
            }

            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-white">
                Loading product...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex justify-center items-center text-white">
                Prodotto non trovato
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-96 w-full">
                    <Image
                        src={product.imageUrl || PLACEHOLDER}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl font-semibold mb-4">€ {product.price}</p>
                    {product.description && (
                        <p className="text-gray-300">{product.description}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
