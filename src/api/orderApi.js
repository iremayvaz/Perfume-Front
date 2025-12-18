import axios from '../utils/axios';

// Backend: RestOrderController -> @PostMapping("/order/{user_id}")
export const placeOrder = async (userId, addressData) => {
    try {
        const res = await axios.post(`/order/${userId}`, addressData);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        console.error("Sipariş hatası:", err);
        return {
            success: false,
            message: err.response?.data?.message || 'Sipariş oluşturulamadı!',
        };
    }
};

export const viewOrders = async (userId) => {
    try {
        const res = await axios.get(`/order/user/${userId}`);
        return {
            success: true,
            data: res.data, // Backend: List<ViewOrdersResponse>
        };
    } catch (err) {
        console.error("Sipariş geçmişi hatası:", err);
        return {
            success: false,
            message: err.response?.data?.message || 'Sipariş geçmişi alınamadı.',
        };
    }
};

export const viewOrderDetails = async (orderId) => {
    try {
        const res = await axios.get(`/order/details/${orderId}`);
        return {
            success: true,
            data: res.data, // Backend: ViewOrderDetailResponse
        };
    } catch (err) {
        console.error("Sipariş detay hatası:", err);
        return {
            success: false,
            message: err.response?.data?.message || 'Sipariş detayı görüntülenemedi.',
        };
    }
};