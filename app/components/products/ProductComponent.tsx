import React from "react";
import Image from "next/image";

type ProductComponentProps = {
    name: string;
    price?: string;
    imageSrc?: string;
};

const ProductComponent: React.FC<ProductComponentProps> = ({
                                                               name,
                                                               price,
                                                               imageSrc,
                                                           }) => {
    return (
        <div className="bg-white dark:bg-zinc-800 shadow rounded-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            {imageSrc && (
                <div className="relative h-48 w-full">
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}
            <div className="p-4 flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                    {name}
                </h4>
                {price && (
                    <p className="text-black dark:text-white mt-2 font-medium">{price}</p>
                )}
            </div>
        </div>
    );
};

export default ProductComponent;