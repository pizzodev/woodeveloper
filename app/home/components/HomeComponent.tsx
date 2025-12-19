"use client";

import React from "react";

export default function HomeComponent() {
    //const [products, setProducts] = useState<Product[]>([]);

    /*useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(productsDb, "products"));
                const productsData: Product[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Product, "id">), // type assertion
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);*/

    return (
        <>
            <div>Home</div>
        </>
    );
}
