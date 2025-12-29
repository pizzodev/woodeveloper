"use client";

import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "@/app/libs/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { mapDocToProduct, Product } from "@/app/data/products/Product";
import ProductComponent from "@/app/products/list/components/ProductComponent";
import { useParams } from "next/navigation";
import { useAppNavigator } from "@/app/AppNavigator";

const PLACEHOLDER = "/logo-sold-out.png";

type FormState = {
    name: string;
    price: string;
    description: string;
    files: FileList | null;
};

export const AdminEditProductComponent: React.FC = () => {
    const navigator = useAppNavigator();
    const { docId } = useParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loadedProduct, setLoadedProduct] = useState<Product | null>(null);
    const [formState, setFormState] = useState<FormState>({
        name: "",
        price: "",
        description: "",
        files: null,
    });
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Traccia quali immagini stanno caricando
    const [uploadingIndexes, setUploadingIndexes] = useState<number[]>([]);

    // Carica prodotto
    useEffect(() => {
        const fetchProduct = async () => {
            if (!docId) return;

            const docRef = doc(db, "products", docId as string);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                setLoadedProduct(null);
                return;
            }

            const data = await mapDocToProduct(docSnap);

            setLoadedProduct({
                ...data,
                imageUrls: data.imageUrls || [PLACEHOLDER],
                imagePaths: data.imagePaths || [],
            });

            setFormState({
                name: data.name,
                price: data.price.toString(),
                description: data.description,
                files: null,
            });
        };

        fetchProduct();
    }, [docId]);

    // Selezione nuove immagini
    const handleFilesSelected = (files: FileList | null) => {
        setFormState(prev => ({ ...prev, files }));
        if (!files) {
            setPreviewUrls([]);
            return;
        }

        const newPreviews: string[] = [];
        for (let i = 0; i < files.length; i++) {
            newPreviews.push(URL.createObjectURL(files[i]));
        }
        setPreviewUrls(newPreviews);
    };

    // Aggiorna prodotto (nome, prezzo, nuove immagini)
    const handleUpload = async () => {
        if (!formState.name || !formState.price) {
            setError("Nome e prezzo sono obbligatori");
            return;
        }

        if (!loadedProduct) return;

        setLoading(true);
        setError("");

        try {
            const newImagePaths: string[] = [];
            const newImageUrls: string[] = [];

            if (formState.files && formState.files.length > 0) {
                const uploading: number[] = [];
                for (let i = 0; i < formState.files.length; i++) {
                    uploading.push(i);
                }
                setUploadingIndexes(uploading);

                for (let i = 0; i < formState.files.length; i++) {
                    const file = formState.files[i];
                    const storageRef = ref(storage, `products/${file.name}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);
                    newImagePaths.push(`products/${file.name}`);
                    newImageUrls.push(url);

                    // Rimuovi l'indice appena completato
                    setUploadingIndexes(prev => prev.filter(idx => idx !== i));
                }
            }

            const docRef = doc(db, "products", loadedProduct.docId);
            const updatedImagePaths = [...(loadedProduct.imagePaths || []), ...newImagePaths];
            const updatedImageUrls = [...(loadedProduct.imageUrls || []), ...newImageUrls];

            await updateDoc(docRef, {
                name: formState.name,
                price: Number(formState.price),
                description: formState.description,
                imagePaths: updatedImagePaths,
            });

            setLoadedProduct({
                ...loadedProduct,
                name: formState.name,
                price: Number(formState.price),
                description: formState.description,
                imagePaths: updatedImagePaths,
                imageUrls: updatedImageUrls,
            });

            setFormState(prev => ({ ...prev, files: null }));
            setPreviewUrls([]);
        } catch (err) {
            console.error(err);
            setError("Errore durante l'aggiornamento");
        } finally {
            setLoading(false);
            setUploadingIndexes([]);
        }
    };

    const handleDeleteImage = async (index: number) => {
        if (!loadedProduct || !loadedProduct.imagePaths) return;
        const pathToDelete = loadedProduct.imagePaths[index];

        if (!confirm("Sei sicuro di voler eliminare questa immagine?")) return;

        setLoading(true);
        setError("");

        try {
            await deleteObject(ref(storage, pathToDelete)).catch(() => {});

            const docRef = doc(db, "products", loadedProduct.docId);
            const updatedPaths = loadedProduct.imagePaths.filter((_, i) => i !== index);
            const updatedUrls = loadedProduct.imageUrls.filter((_, i) => i !== index);

            await updateDoc(docRef, { imagePaths: updatedPaths });

            setLoadedProduct({
                ...loadedProduct,
                imagePaths: updatedPaths,
                imageUrls: updatedUrls,
            });
        } catch (err) {
            console.error(err);
            setError("Errore durante l'eliminazione dell'immagine");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async () => {
        if (!loadedProduct) return;
        if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

        setLoading(true);
        setError("");

        try {
            if (loadedProduct.imagePaths) {
                for (const path of loadedProduct.imagePaths) {
                    await deleteObject(ref(storage, path)).catch(() => {});
                }
            }

            const docRef = doc(db, "products", loadedProduct.docId);
            await deleteDoc(docRef);

            setLoadedProduct(null);
            setFormState({ name: "", price: "", description: "", files: null });
            setPreviewUrls([]);
            alert("Prodotto eliminato con successo!");
            navigator.popBack();
        } catch (err) {
            console.error(err);
            setError("Errore durante l'eliminazione");
        } finally {
            setLoading(false);
        }
    };

    if (!loadedProduct) {
        return <p className="text-white">Prodotto non trovato o eliminato</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Form modifica prodotto */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md max-w-md mx-auto mb-8">
                <h3 className="text-xl font-semibold mb-4">Modifica prodotto</h3>

                <input
                    type="text"
                    placeholder="Nome prodotto"
                    value={formState.name}
                    onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                />

                <input
                    type="number"
                    placeholder="Prezzo"
                    value={formState.price}
                    onChange={e => setFormState(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                />

                <textarea
                    placeholder="Descrizione"
                    value={formState.description}
                    onChange={e => setFormState(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full mb-3 p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none resize-none"
                    rows={2}
                />

                {/* Griglia immagini */}
                <div className="mt-4 grid grid-cols-4 gap-3 items-center">
                    {loadedProduct.imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                            <img src={url} alt={`Img ${index}`} className="w-full h-24 object-cover rounded" />

                            {/* Bottone X */}
                            <button
                                onClick={() => handleDeleteImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>

                            {/* Clessidra overlay */}
                            {uploadingIndexes.includes(index) && (
                                <div className="absolute top-1 left-1 w-6 h-6 flex items-center justify-center bg-gray-800 rounded-full animate-spin">
                                    ⏳
                                </div>
                            )}
                        </div>
                    ))}

                    {previewUrls.map((url, index) => (
                        <div key={`preview-${index}`} className="relative">
                            <img src={url} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded opacity-70" />
                            <div className="absolute top-1 left-1 w-6 h-6 flex items-center justify-center bg-gray-800 rounded-full animate-spin">
                                ⏳
                            </div>
                        </div>
                    ))}

                    {/* Pulsante "+" */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-24 flex items-center justify-center text-3xl font-bold bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                    >
                        +
                    </button>
                </div>

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={e => handleFilesSelected(e.target.files)}
                />

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded font-medium transition-colors mb-2"
                >
                    {loading ? "Aggiornamento..." : "Aggiorna Prodotto"}
                </button>

                <button
                    onClick={handleDeleteProduct}
                    disabled={loading}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 rounded font-medium transition-colors"
                >
                    {loading ? "Cancellazione..." : "Elimina Prodotto"}
                </button>
            </div>

            {/* Anteprima prodotto */}
            <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                <ProductComponent
                    key={loadedProduct.docId}
                    docId={loadedProduct.docId}
                    name={loadedProduct.name}
                    price={loadedProduct.price}
                    description={loadedProduct.description}
                    imageUrls={loadedProduct.imageUrls}
                />
            </div>
        </div>
    );
};