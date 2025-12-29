"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/app/data/products/Product";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type ProductDetailComponentProps = {
    product: Product;
};

export const ProductDetailComponent: React.FC<ProductDetailComponentProps> = (
    {
        product,
    }
) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = product.imageUrls.length;

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total);
    };

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
            {/* Carousel */}
            <div className="relative w-full max-w-4xl h-96 rounded-xl overflow-hidden shadow-lg mb-6">
                {product.imageUrls.map((url, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Image
                            src={url}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ))}

                {/* Arrows */}
                {total > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
                        >
                            <ChevronLeftIcon className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
                        >
                            <ChevronRightIcon className="w-6 h-6 text-white" />
                        </button>
                    </>
                )}
            </div>

            {/* Product info */}
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl font-semibold mb-4">€ {product.price}</p>
            </div>
        </div>
    );
};