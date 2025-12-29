import {DocumentSnapshot} from "@firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "@/app/libs/firebase";

export interface Product {
    docId: string;
    name: string;
    price: number;
    description: string;
    imagePaths: string[];
    imageUrls: string[];
}

export async function mapDocToProduct(doc: DocumentSnapshot): Promise<Product> {
    const data = doc.data();
    if (!data) throw new Error(`Document ${doc.id} has no data`);
    const product = {
        docId: doc.id,
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrls: data.imageUrls,
        imagePaths: data.imagePaths,
    };
    return await enhanceProductWithUrls(product)
}

const PLACEHOLDER = "/logo-sold-out.png";
async function enhanceProductWithUrls(product: Product): Promise<Product> {
    let imageUrls: string[] = [];

    if (product.imagePaths && product.imagePaths.length > 0) {
        try {
            imageUrls = await Promise.all(
                product.imagePaths.map(async path => {
                    try {
                        return await getDownloadURL(ref(storage, path));
                    } catch {
                        return PLACEHOLDER;
                    }
                })
            );
        } catch {
            imageUrls = [PLACEHOLDER];
        }
    } else {
        imageUrls = [PLACEHOLDER];
    }

    return { ...product, imageUrls };
}