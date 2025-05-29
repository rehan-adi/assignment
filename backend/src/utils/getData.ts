import { Product } from "../interface/interface.js";
import { productsDB } from "../database/database.js";

interface ProductApiResponse {
    success: boolean;
    data: Product[];
}

export async function fetchProductsData() {
    try {
        const response = await fetch("https://freeapihub.onrender.com/api/v1/products");

        const json = (await response.json()) as ProductApiResponse;

        const data: Product[] = json.data;

        productsDB.length = 0;
        productsDB.push(...data);

        console.log(`✅ Fetched and stored ${data.length} products`);
    } catch (error) {
        console.error("❌ Failed to fetch products data:", error);
    }
}

