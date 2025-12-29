import React from "react";

type ProductInfoComponentProps = {
    name: string,
    description: string,
    price: number,
}
export const ProductInfoComponent: React.FC<ProductInfoComponentProps> = (
    {
        name,
        description,
        price
    }
) => {
    return (
        <div className="max-w-4xl w-full flex items-center justify-between gap-6 p-4">
            {/* Sinistra: titolo + descrizione */}
            <div className="flex-1 text-left">
                <h1 className="text-md font-bold mb-2 text-white">
                    {name}
                </h1>
                {description && (
                    <p className="text-sm text-gray-300 whitespace-pre-line">
                        {description}
                    </p>
                )}
            </div>

            {/* Destra: box prezzo */}
            <div className="shrink-0 bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 text-center">
                <p className="text-xs font-bold text-white">
                    € {price}
                </p>
            </div>
        </div>
    )
}