import React from "react";
import {ProductImageComponent} from "@/app/products/list/components/ProductImageComponent";

type ProductComponentProps = {
    docId: string;
    name: string;
    price: number;
    imageUrls: string[];
};

const ProductComponent: React.FC<ProductComponentProps> = ({ name, price, imageUrls }) => {
    return (
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            <ProductImageComponent imageUrls={imageUrls} />
            <div className="p-4 flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-white">{name}</h4>
                <p className="text-white mt-2 font-medium">€ {price}</p>
            </div>
        </div>
    );
};

export default ProductComponent;
