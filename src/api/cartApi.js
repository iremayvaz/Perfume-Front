import axios from '../utils/axios';

export const addToCart = async (userId, cartItem) => {
    try {
        const res = await axios.post(`/cart/add/to/${userId}`, cartItem);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || 'Sepete eklenemedi!',
        };
    }
};

export const viewCart = async (userId) => {
    try {
        const res = await axios.get(`/cart/view/${userId}`);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {

        return {
            success: false,
            message: err.response?.data?.message || 'Sepete eklenemedi!',
        };
    }
};

export const removeFromCart = async (userId, itemId) => {
    try {
        const res = await axios.delete(`/cart/remove/${itemId}/from/${userId}`);
        return {
            success: true,
            message: res.data, // backend string dönüyor
        };
    } catch (err) {
        return {
            success: false,
            message: 'Sepet ürünü bulunamadı',
        };
    }
};

export const updateCartItemQuantity = async (userId, itemId, quantity) => {
    try {
        const res = await axios.put(`/cart/${userId}/update`, null, {
            params : {item_id : itemId, quantity}
        });
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return {
            success: false,
            message: 'Sepet ürünü güncellenemedi',
        };
    }
};
