"use client";

import Image from "next/image";
import React from "react";

type ProductImageComponentProps = {
    imageUrl: string;
};

export const ProductImageComponent: React.FC<ProductImageComponentProps> = ({ imageUrl }) => {
    const src = imageUrl && imageUrl.length > 0 ? imageUrl : "/logo-sold-out.png";
    return (
        <div className="relative h-48 w-full">
            <Image
                src={src}
                alt="Logo"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
            />
        </div>
    );
};