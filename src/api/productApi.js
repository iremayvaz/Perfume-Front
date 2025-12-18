import axios from "../utils/axios";

export const getProducts = async () => {
    try {
        const res = await axios.get("/perfume/list");
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Ürünler alınamadı",
        };
    }
};

export const filterProducts = async (filters = {}) => {
    try {
        const params = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v != null && v !== '')
        );
        const res = await axios.get("/perfume/filter", {params});
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Ürünler alınamadı",
        };
    }
};

export const getProductDetail = async (id) => {
    try {
        const res = await axios.get(`/perfume/${id}`);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Ürün detayı alınamadı",
        };
    }
};
