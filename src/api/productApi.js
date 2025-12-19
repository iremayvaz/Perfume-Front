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
        const activeFilter = Object.entries(filters).find(([_, v]) => v !== '' && v != null);

        let queryParams = {};
        if (activeFilter) {
            const [key, value] = activeFilter;

            queryParams = {
                column: key,
                content: value
            };
        }

        // 2. axios.get içinde params: queryParams şeklinde gönderiyoruz
        // Axios bunu otomatik olarak ?column=...&content=... formatına sokar
        const res = await axios.get("/perfume/filter", { params: queryParams });
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
