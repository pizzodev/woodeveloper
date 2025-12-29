"use client";

import React, { useState, useEffect } from "react";
import { db, storage } from "@/app/libs/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProductComponent from "@/app/products/list/components/ProductComponent";
import { mapDocToProduct, Product } from "@/app/data/products/Product";
import {useAppNavigator} from "@/app/AppNavigator";


export const AdminAddProductComponent: React.FC = () => {

    const navigator = useAppNavigator()
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Carica prodotti con cache
    useEffect(() => {
        const fetchProducts = async () => {
            const snapshot = await getDocs(collection(db, "products"));
            const prods: Product[] = await Promise.all(
                snapshot.docs.map(async doc => {
                    return await mapDocToProduct(doc);
                })
            );

            setProducts(prods);
        };

        fetchProducts();
    }, []);

    const handleUpload = async () => {
        if (!files || !name || !price) {
            setError("Compila tutti i campi e scegli almeno un file");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const imagePaths: string[] = [];
            const imageUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const storageRef = ref(storage, `products/${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                imagePaths.push(`products/${file.name}`);
                imageUrls.push(url);
            }

            // Salva prodotto in Firestore
            const docRef = await addDoc(collection(db, "products"), {
                name,
                price,
                imagePaths,
            });

            const newProduct: Product = {
                docId: docRef.id,
                name,
                price,
                description,
                imagePaths,
                imageUrls,
            };

            const updatedProducts = [...products, newProduct];
            setProducts(updatedProducts);

            setName("");
            setPrice(0);
            setDescription("")
            setFiles(null);

            alert("Prodotto aggiunto con successo!");
        } catch (err) {
            console.error(err);
            setError("Errore durante il caricamento");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">

            {/* Form aggiungi prodotto */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md max-w-md mx-auto mb-8">
                <h3 className="text-xl font-semibold mb-4">Aggiungi prodotto</h3>
                <input
                    type="text"
                    placeholder="Nome prodotto"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                />
                <input
                    type="number"
                    placeholder="Prezzo"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                />
                <textarea
                    placeholder="Descrizione"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none resize-none"
                    rows={2} // Altezza iniziale, puoi cambiare
                />
                <input
                    type="file"
                    multiple
                    onChange={e => setFiles(e.target.files)}
                    className="w-full mb-3 text-white"
                />
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded font-medium transition-colors"
                >
                    {loading ? "Caricamento..." : "Aggiungi Prodotto"}
                </button>
            </div>

            {/* Lista prodotti */}
            <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {products.map(product => (
                    <div
                        key={product.docId}
                        onClick={(e) => {
                            e.preventDefault()
                            navigator.navigate(`/admin/edit/${product.docId}`)
                        }}
                    >
                        <ProductComponent
                            key={product.docId}
                            docId={product.docId}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            imageUrls={product.imageUrls}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};