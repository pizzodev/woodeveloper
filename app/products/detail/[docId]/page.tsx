"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import {ScaffoldComponent} from "@/app/ScaffoldComponent";
import {ProductDetailComponent} from "@/app/products/detail/components/ProductDetailComponent";
import { mapDocToProduct, Product} from "@/app/data/products/Product";

const CACHE_KEY_PREFIX = "product_";
const CACHE_DURATION = 1000 * 60; // 1 minuto

const ProductDetailPage: React.FC = () => {
    const { docId } = useParams<{ docId: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!docId) {
            console.log("DocId is undefined")
            return;
        }

        const fetchProduct = async () => {
            // Cache
            const cached = localStorage.getItem(CACHE_KEY_PREFIX + docId);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setProduct(data);
                    setLoading(false);
                    return;
                }
            }

            try {
                const docRef = doc(db, "products", docId);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    console.log(`Didn't find any product with this id ${docId}`)
                    setProduct(null);
                    return;
                }

                const productData = await mapDocToProduct(docSnap);

                setProduct(productData);

                localStorage.setItem(
                    CACHE_KEY_PREFIX + docId,
                    JSON.stringify({ data: productData, timestamp: Date.now() })
                );
            } catch (err) {
                console.error(err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [docId]);

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
        <ScaffoldComponent backgroundVideo={"../../videos/carpenter.mp4"}>
            <ProductDetailComponent product={product}/>
        </ScaffoldComponent>
    );
};

export default ProductDetailPage;