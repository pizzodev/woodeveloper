"use client";

import Image from "next/image";
import React, { useState } from "react";

type ProductImageComponentProps = {
    imageUrls: string[];
};

export const ProductImageComponent: React.FC<ProductImageComponentProps> = ({ imageUrls }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);

    return (
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
                src={imageUrls[currentIndex]}
                alt={`Product Image ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority
            />

            {/* Frecce di navigazione */}
            {imageUrls.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-1 rounded-full text-white z-10"
                    >
                        ‹
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-1 rounded-full text-white z-10"
                    >
                        ›
                    </button>

                    {/* Indicatori dei puntini */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                        {imageUrls.map((_, idx) => (
                            <span
                                key={idx}
                                className={`w-2 h-2 rounded-full border border-white ${
                                    idx === currentIndex ? "bg-white" : "bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
