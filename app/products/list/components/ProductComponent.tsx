import React from "react";
import {ProductImageComponent} from "@/app/products/list/components/ProductImageComponent";
import {ProductInfoComponent} from "@/app/products/list/components/ProductInfoComponent";

type ProductComponentProps = {
    docId: string;
    name: string;
    price: number;
    description: string;
    imageUrls: string[];
};

const ProductComponent: React.FC<ProductComponentProps> = ({ name, price, description, imageUrls }) => {
    return (
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            <ProductImageComponent imageUrls={imageUrls} />
            <ProductInfoComponent name={name} description={description} price={price}/>
        </div>
    );
};

export default ProductComponent;
