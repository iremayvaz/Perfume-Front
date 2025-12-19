import axios from '../utils/axios';

// Kullanıcının tüm adreslerini getirir
export const getAddressesAsync = async (userId) => {
    try {
        const res = await axios.get(`/user/view/address/${userId}`);
        return { success: true, data: res.data };
    } catch (err) {
        return { success: false, message: 'Adresler yüklenemedi' };
    }
};

// Yeni adres ekler
export const addAddressAsync = async (userId, addressData) => {
    try {
        const res = await axios.post(`/user/address/${userId}`, addressData);
        return { success: true, data: res.data };
    } catch (err) {
        return { success: false, message: 'Adres eklenemedi' };
    }
};

// Mevcut adresi günceller
export const updateAddressAsync = async (addressId, addressData) => {
    try {
        const res = await axios.put(`/user/update/${addressId}`, addressData);
        return { success: true, data: res.data };
    } catch (err) {
        return { success: false, message: 'Adres güncellenemedi' };
    }
};

// Adresi siler
export const deleteAddressAsync = async (addressId) => {
    try {
        await axios.delete(`/user/delete/address/${addressId}`);
        return { success: true };
    } catch (err) {
        return { success: false, message: 'Adres silinemedi' };
    }
};