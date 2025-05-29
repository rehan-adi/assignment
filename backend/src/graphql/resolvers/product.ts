import { productsDB } from "../../database/database.js";
import type { Product } from "../../interface/interface.js";

interface ProductFilterInput {
    search?: string;
    category?: string;
    sortBy?: keyof Product;
    sortOrder?: "asc" | "desc";
}

export const productResolvers = {
    Query: {
        getProducts: (_: any, args: { filter?: ProductFilterInput }) => {
            let filteredProducts = [...productsDB];

            const { filter } = args;

            if (filter) {
                const { search, category, sortBy, sortOrder } = filter;

                if (search) {
                    const lowerSearch = search.toLowerCase();
                    filteredProducts = filteredProducts.filter(
                        (product) =>
                            product.title.toLowerCase().includes(lowerSearch)
                    );
                }

                if (category) {
                    filteredProducts = filteredProducts.filter(
                        (product) => product.category.toLowerCase() === category.toLowerCase()
                    );
                }

                if (sortBy) {
                    filteredProducts.sort((a, b) => {
                        const valA = a[sortBy];
                        const valB = b[sortBy];

                        if (valA == null || valB == null) return 0;

                        if (typeof valA === "string" && typeof valB === "string") {
                            if (sortOrder === "desc") {
                                return valB.localeCompare(valA);
                            }
                            return valA.localeCompare(valB);
                        }

                        if (typeof valA === "number" && typeof valB === "number") {
                            if (sortOrder === "desc") {
                                return valB - valA;
                            }
                            return valA - valB;
                        }

                        return 0;
                    });
                }
            }

            return {
                data: filteredProducts,
            };
        },
    },
};
