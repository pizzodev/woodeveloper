import React from "react";
import {ProductImageComponent} from "@/app/products/list/components/ProductImageComponent";
import {useAppNavigator} from "@/app/AppNavigator";

type ProductComponentProps = {
    id: string | undefined,
    name: string;
    price: number;
    imageUrl: string;
};

const ProductComponent: React.FC<ProductComponentProps> = (
    {
        id,
        name,
        price,
        imageUrl,
    }
) => {
    const navigator = useAppNavigator()
    return (
        <div
            onClick={() => {
                //navigator.navigate(`products/detail/${id}`)
            }}
            className="bg-white dark:bg-zinc-800 shadow rounded-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            {imageUrl && (
                <ProductImageComponent imageUrl={imageUrl}/>
            )}
            <div className="p-4 flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                    {name}
                </h4>
                {price && (
                    <p className="text-black dark:text-white mt-2 font-medium">€ {price}</p>
                )}
            </div>
        </div>
    );
};

export default ProductComponent;