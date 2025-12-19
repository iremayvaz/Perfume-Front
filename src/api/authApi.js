import axios from '../utils/axios';

export const loginAsync = async (payload) => {
    try {
        const res = await axios.post('/login', payload);
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || 'Giriş başarısız',
        };
    }
};

export const registerAsync = async (payload) => {
    try {
        await axios.post('/register', payload);
        return {
            success: true,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || 'Kayıt başarısız',
        };
    }
};

export const getUserInformationAsync = async (token) => {
    try {
        const res = await axios.get('/me', { headers: {"Authorization" : `Bearer ${token}`} });
        return {
            success: true,
            data: res.data,
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || 'Kayıt başarısız',
        };
    }
};

// src/api/authApi.js içinde
export const refreshTokenApi = async (refreshToken) => {
    try {
        const res = await axios.post("/refresh-token", { refreshToken }); // Endpoint'i backend'e göre güncelleyin
        return res.data; // Yeni access token ve gerekirse yeni refresh token döner
    } catch (err) {
        throw err;
    }
};
